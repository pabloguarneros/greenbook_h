class UserProfile extends React.Component{
    
    constructor(props) {
        super(props);
        this.onPlantClick = this.onPlantClick.bind(this);

      }
    
    onPlantClick(e){
        e.preventDefault();
        const plant_index = e.target.value;
        component.setState((state, props) => ({
            scene:2,
            selected_plant: state.user.plants[plant_index]
        }))
    }

    render(){
        const user = component.state.user;
        function togglePlantCreation(){
            $("#add_plant_input").css("display","flex");
            $("#add_plant button").css("display","none");
        };
        function createPlant(){
            user.createPlant();
            $("#add_plant_input").css("display","none");
            $("#add_plant button").css("display","flex");
        };
        return(
            <div id="user_profile" className="fc ac">
                <div id="profile_meta" className="fc ac">
                    {(user.photoURL) ? <img src={user.photoURL} alt={user.username}/>
                        : <img src={window.location.origin.concat("/static/icons/default_user.png")} alt={user.username}/>
                    }
                    <p id="profile_mssg" className="tt_cent">Hi {user.username.charAt(0).toUpperCase() + user.username.slice(1)}! <br/> Feel free to start adding plants.</p>
                </div>
                <div id="user_plants" className="fr">
                    {user.plants.map((plant,index) => {
                        return(
                        <div className="one_plant">
                            {(plant.records.length>0) ? <img src={plant.records[0]["photoURL"]} alt="Your plant"/>
                            : <img src={window.location.origin.concat("/static/icons/plant.png")} alt="Your plant"/>
                            }
                            <button value={index} onClick={this.onPlantClick}>
                            </button>
                        </div>
                    )})}
                </div>
                <div id="add_plant">
                    <button onClick={togglePlantCreation}> + </button>
                </div>
                <div id="add_plant_input" class="fc ac">
                    <small class="tt_cent"> Enter A Nickname For Your New Plant </small> 
                    <textarea value={user.newPlantName} name="newPlantName" onChange={user.handleChange} />
                    <button onClick={createPlant}>Add</button>
                </div>

            </div>
        )}
    }
