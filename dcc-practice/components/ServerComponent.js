
 //import Iconnection from '../typeScripts/IConnection';

const ServerComponent = ({userId, ip, port}) => {
    console.log("ServerComponent 렌더링");

    return (
        <div>
            <h4>
                Server Component
            </h4>
            {/* <h5>
                User Id: {userId}  
            </h5>
            <h5>
                Ip: {ip}
            </h5>
            <h5>
                Port: {port}
            </h5> */}
        </div>
    );
};

export default ServerComponent;