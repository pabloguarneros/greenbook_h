class PlantProfile extends React.Component{
    constructor(props) {
        super(props);
        this.toggleCamera = this.toggleCamera.bind(this);

      }

    toggleCamera(e){
        e.preventDefault();
        component.setState((state, props) => ({
            scene:3,
        }))
    }


    render(){
        const plant = component.state.selected_plant;
        console.log(plant);

        function createRecord(){
            $("#add_journal_entry").css("display","none");
            $("#choose_file_img").css("display","flex");
        }

        return(
            <div id="plant_profile" className="fc ac">
                <div id="plant_image">
                    {(plant.records.length>0) ? <img src={plant.records[0]["photoURL"]} alt="Your plant"/>
                    : <img src={window.location.origin.concat("/static/icons/plant.png")} alt="Your plant"/>
                    }
                </div>
                <div id="plant_detail" className="fc">
                    <div id="plant_nickname">
                        <p className="state_label">{plant.nickname}</p>
                    </div>
                    <div>
                        <p className="state_label">current state:</p>
                        <p className="state_value">HEALTHY</p>
                    </div>
                    <div>
                        <p className="state_label">recommendation:</p>
                        <p className="state_value">none ATM</p>
                    </div>
                </div>
                <div id="add_journal_entry" class="fc ac">
                    <button onClick={createRecord}>Add Journal Record </button>
                </div>
                <div id="choose_file_img" className="fc ac">
                    <input type="file" name="uploader"id="uploader"                               
                    accept="image/*"/>
                </div>
            </div>
        )}
    }
