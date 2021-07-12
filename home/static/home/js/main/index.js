let component;

$(document).ready( () => {
    component = ReactDOM.render(<MainApp/> , $("#appIndex")[0]);
});

class MainApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scene: null,
            user: null,
            selected_plant: null
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({ [name]: target.value });
    } // handleChange 

    componentDidMount(){ this.handleFetchUser() };

    handleFetchUser(){
        const userAPI = "/api/user/".concat($("#appIndex").attr("name"));
        fetch(userAPI)
            .then((response) => response.json())
            .then((data) => {
                const user = new User(
                                data["pk"], // = pk
                                data["username"], // = username
                                data["photo"], // = photoURL
                                []); // = plants
                for (let i in data["plants"]){
                    const plantData = data["plants"][i];
                    const species = (plantData["species"]) ? plantData["species"]["name"] : "Plantin"
                    const plant = new Plant(
                                    plantData["pk"], // = pk
                                    plantData["nickname"], // = nickname
                                    species, // = species
                                    []) // = records
                    for (let r in plantData["record_set"]){
                        const recordData = plantData["record_set"][r];
                        const record = new Record(
                                        recordData["pk"], // = pk
                                        recordData["photo"], // = photoURL
                                        recordData["health"], // = health
                                        recordData["date_recorded"]) // = dateCreated
                        plant.records.push(record)
                    };
                    user.plants.push(plant);
                };
                component.setState(({
                    scene:1,
                    user:user
                }))
                console.log(this.state.user);
                $('#bg_mountain').addClass("grow")} );  
    } // end handleFetchUser

    render() {
        switch (this.state.scene){
            case 1: return <UserProfile />
            case 2: return <PlantProfile />
            case 3: return <Camera />
            default: return this.renderEmpty()
        }
    };

    renderEmpty(){
        return(<div></div>)
    }

}