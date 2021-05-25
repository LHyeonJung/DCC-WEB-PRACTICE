

const GroupComponent = ({userId, ip}) => {
    console.log("GroupComponent 렌더링");
    
    console.log("---", {userId}, {ip});

    return (
        <div>
            <div>
                Group
            </div>
            <h4>
                User Id: {userId}  
            </h4>
            <h4>
                Ip: {ip}
            </h4>
        </div>
    );
};

export default GroupComponent;