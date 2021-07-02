import React, { Component, useEffect, useRef, useCallback, useState } from 'react';


function DragAndDrop(props)
{
    const [isDragging, setIsDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    const dropRef = useRef();

    useEffect(() => {
        console.log("ComponentDidMount - Component가 Mount될 때(컴포넌트가 브라우저에 나타나게 됐을 때 호출)");
        setDragCounter(0);
        dropRef.current.addEventListener("dragenter", handleDragIn);
        dropRef.current.addEventListener("dragleave", handleDragOut);
        dropRef.current.addEventListener("dragover", handleDrag);
        dropRef.current.addEventListener("drop", handleDrop);

        return () =>{ // return값을 넘기면 ComponentWillUnmount역할
            console.log("ComponentWillUnmount - Component가 Unmount될 때(컴포넌트가 필요하지 않게 됐을 때")
            console.log("dropRef.current: "+dropRef.current);
            if (dropRef.current !== null) {
                dropRef.current.removeEventlistener("dragenter", handleDragIn);
                dropRef.current.removeEventlistener("dragleave", handleDragOut);
                dropRef.current.removeEventlistener("dragover", handleDrag);
                dropRef.current.removeEventlistener("drop", handleDrop);
            }
        }
    }, []); //두번째 인자로 빈 배열을 넘기면 최초에만 실행되는 것

    // useEffect(()=> {
    //     console.log("ComponentWillUnmount - Component가 Unmount될 때(컴포넌트가 필요하지 않게 됐을 때")
    //     console.log("dropRef.current: "+dropRef.current);
    //     if (dropRef.current !== null) {
    //         dropRef.current.removeEventlistener("dragenter", handleDragIn);
    //         dropRef.current.removeEventlistener("dragleave", handleDragOut);
    //         dropRef.current.removeEventlistener("dragover", handleDrag);
    //         dropRef.current.removeEventlistener("drop", handleDrop);
    //       }
    //     return dropRef; // return값을 넘기면 ComponentWillUnmount역할
    // });

    /*
        e.preventDefault(); - 무언가 끌어다 놓을 때 (ex. file) 브라우저의 기본 동작을 방지
        e.stopPropagation(); - 이벤트가 부모 및 자식 요소를 통해 전파되는 것을 중지
        
        ==> hook에서는 이미 기본 이벤트를 방지/차단하고 있기 때문에 중복 사용할 필요는 없음
     */

    // dragover (drop된 파일을 여는 이벤트에서 기본 브라우저 동작을 방지하기 위해 사용)
    const handleDrag = useCallback((e)=> {
        e.preventDefault();
        e.stopPropagation();
    },[]);

    // dragenter
    const handleDragIn = useCallback((e)=> {
        e.preventDefault();
        e.stopPropagation();

        let dragCnt = dragCounter;
        setDragCounter(dragCnt++);
        // drag event에 파일이 있는지 확인하여 오버레이 표시
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0)
        {
            setIsDragging(true);
        }
    },[]);

    // dragleave
    const handleDragOut = useCallback((e)=> {
        e.preventDefault();
        e.stopPropagation();

        let dragCnt = dragCounter;
        setDragCounter(dragCnt--);
        if(dragCounter === 0)
        {
            setIsDragging(false);
        }
    },[]);

    // drop
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
        let files_temp =  e.dataTransfer.files;
        console.log("main handleDrop의 files_temp length : "+files_temp.length);
        console.log(files_temp[0]);
        console.log("DragCounter(handleDrop): "+dragCounter);
        if( e.dataTransfer.files && e.dataTransfer.files.length>0){
            console.log("main handleDrop 진입");
            props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            setDragCounter(0);
        }
      }, []);

    return (
        <div ref={dropRef} style={{display: 'inline-block', position:'relative'}}>
            {isDragging && 
                <div 
                    style={{
                        margin: '10%',
                        border: 'dashed grey 4px',
                        backgroundColor: 'rgba (255,255,255,0)',
                        position: 'absolute',
                        width: 500,
                        height: 350,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '40%',
                            right: 0,
                            left: 0,
                            textAlign: 'center',
                            color: 'grey',
                            fontSize: 36
                        }}
                    >
                        <div> drop here :) </div>
                    </div>
                </div>
            }

            <div> {props.children} </div>
            {/* {props.children} */}
        </div>
    );
};

export default DragAndDrop;