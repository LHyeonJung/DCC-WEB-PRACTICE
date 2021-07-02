import React, {
    ChangeEvent,
    useCallback,
    useRef,
    useState,
    useEffect
  } from "react";
import {Record, List, Map} from 'immutable';

const DragDropUpload = () => {

    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState({});

    const dragRef = useRef(null);
    const fileId = useRef(0);

    const onChangeFiles = useCallback((e) => {

    },[]);

    return (
        <div>
            
        </div>
    );
};

export default DragDropUpload;