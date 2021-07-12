class User{

    constructor(pk, username, photoURL=null, plants=[]) {
        
        this.pk = pk;
        this.username = username;
        this.photoURL = photoURL;
        this.plants = plants;
        this.newPlantName = "";
        this.handleChange = this.handleChange.bind(this);
        this.createPlant = this.createPlant.bind(this);
        this.refreshUser = this.refreshUser.bind(this);

    } // end constructor()

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this[name] =  target.value;
        component.forceUpdate();
    } // handleChange 


    createPlant() {
        
        const url = window.location.origin.concat(`/api/plants`);
        fetch(url, { method:'POST', headers: defaultHeaders,
            body:JSON.stringify({
                "nickname": this.newPlantName
            })})
            .then( () => { 
                this.newPlantName = "";
                this.refreshUser() 
            }
    )} // end createPlant


    refreshUser(){
        const user = this;
        const userAPI = `/api/user/${user.pk}`;
        fetch(userAPI)
            .then((response) => response.json())
            .then((data) => {
                user.username = data["username"], // = username
                user.photo = data["photo"], // = photoURL
                user.plants = []; // = plants
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
                    user:user
                }))
            });
    } // end refreshUser()


} // end User