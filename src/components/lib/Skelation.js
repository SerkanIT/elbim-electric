
import {  Skeleton } from 'antd';




const App = () => {

    return (
        <div style={{height:'479px'}}>

                <Skeleton.Image style={{width:'200px',height:'232px'}} active={true} size={'large'}  />
            <br />
            <br />
            <Skeleton.Input active={true} style={{width:'50%'}} block={'block'} />
            <br />
            <br />
            <Skeleton.Input active={true} size={'small'} block={'block'} />
            <br />
            <br />
            <Skeleton.Input active={true} size={'small'} block={'block'} />
            <br />
            <br />
            <Skeleton.Input style={{width:'20%'}} active={true} size={'small'} block={'block'} />




        </div>
    );
};

export default App;