import React from 'react';

const SettingComponent = ({name}) => {
    console.log("name: "+{name});
    console.log("SettingComponent 렌더링");
    return (
        <div>
            Setting Component  
        </div>
    );
};

export default SettingComponent;