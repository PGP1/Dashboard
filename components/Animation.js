import Lottie from 'react-lottie';
import * as animationData from '../assets/animations/plant.json';

const options = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

/**
* Animation class for animations rendering
*/
export default function Animation() {
    return <div className={"animation"}>
        <Lottie options={options} width={300} height={300}/>
    </div>
}