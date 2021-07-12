class Camera extends React.Component{
    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
      }

    takePicture(){
        const canvas = $("canvas")[0];
        const stream = $("#stream")[0];
        canvas.height =  stream.height;
        canvas.width =  stream.width;
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(stream, 0, 0, canvas.width, canvas.height);
        let data = canvas.toDataURL('image/png');
        console.log(data);
    }

    render(){
        $(document).ready( () => {
            var video = document.querySelector("#stream");
            if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                video.srcObject = stream;
                })
                .catch(function (err0r) {
                console.log(err0r);
                });
            };
        });


        return(<div id="camera_body">

        <input type="file" name="uploader" id="uploader"                               
        accept="image/*" 
        />

        </div>)
    }
}
