import { is } from 'immutable';
import { number } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronLeft, HiOutlineChevronDoubleRight, HiOutlineChevronRight} from "react-icons/Hi";

// https://chanhuiseok.github.io/posts/react-13/

const PageUl = styled.ul`
    margin: 0 auto;
    float: center;
    list-style: none;
    text-align:center;
    color:black;
    padding:5px;
    display: inline-block;
    border-radius: 20px;
    alignItems:center;
    alignSelf: center;
`;

const PageLi = styled.li`
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
    padding: 1px;
    width: 25px;
    &:hover{
        cursor:pointer;
        color: white;
        background-color: gray;
    }
    &:focus::active{
        color: red;
        background-color: #263A6C;
    }
`;

// <span> 태그: 인라인 요소(inline-element)들을 하나로 묶을 때 사용
//  => 스타일링을 위해 요소들을 그룹화하거나 속성값을 공유하는데 유용하게 사용할 수 있음 
//  => <div> 요소와 매우 비슷하게 사용되지만, <div>는 블록 타입 / <span>은 인라인 타입

// const PageSpan = styled.span`
//     &:hover::after,
//     &:focus::after{
//         border-radius: 100%;
//         color:white;
//         background-color: yellow;
//     }
// `;

const PageSpan = styled.span`
    &:hover::after,
    &:focus::after{
        color:white;
        background-color: yellow;
        border: 2px solid red;
    }
`;


function onClickEvent(selected, setPagenate, pageNumberList){
    console.log(selected);
    console.log(pageNumberList);
    if(isNaN(selected))
    {
        if(selected === '<<'){
            setPagenate(pageNumberList[0]);
        }
        else if(selected === '<'){
            if(selected === pageNumberList[0])
                setPagenate(pageNumberList[0]);
            else{
                if(isNaN(selected-1))
                    setPagenate(pageNumberList[0]);
                else
                    setPagenate(selected-1);
            }
        }
        else if(selected === '>>'){
            setPagenate(pageNumberList[pageNumberList.length-1]);//-3]);
        }
        else if(selected === '>'){
            if(selected+1 === pageNumberList[pageNumberList.length-1])//-3])
                setPagenate(pageNumberList[pageNumberList.length-1]);//-3]);
            else{
                if(isNaN(selected+1))
                    setPagenate(pageNumberList[pageNumberList.length-1]);//-3]);
                else
                    setPagenate(selected+1);
            }
        }
    }
    else
    {
        setPagenate(selected);
    }
}

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];//['<<','<']; // 총 페이지 넘버 수 만큼 담은 배열 (ex. 전체 포스트 수:100개, 페이지당 포스트 개수: 10개지정 => pageNumbers배열에 1,2,3,4,5,6,7,8,9,10 생성됨)
    for (let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }
    // pageNumbers.push('>');
    // pageNumbers.push('>>');

    return (
        /*
        // [ 1안 ] styled-components를 기반한 UI
            // pageNumbers 배열을 map 함수를 이용하여 요소 하나씩 꺼내어 <li>로 만들고 클릭이벤트 연결 
                // <li> 하위에 <span>을 만들어 숫자 표시, <span>에 클릭 이벤트 연결
                // <PageSpan onClick={() => paginate(number)} className="page-link">
                    // paginate 함수: 클릭할 때 setCurrentPage 함수의 인자로 number를 넘겨 currentPage 상태값을 변경하는 함수
        <div>
            <nav style={{background:'lightgray', display:'inline-block', position: 'absolute', top:'55%', left:'50%', borderRadius:'20px'}}>
                <PageUl className="pagination">
                    {pageNumbers.map(number => (
                        <PageLi key={number} className="page-item">
                            <PageSpan onClick={() => onClickEvent(number, paginate, pageNumbers)} className="page-link">
                                {number}
                            </PageSpan>
                        </PageLi>
                    ))}
                </PageUl>
            </nav>
        </div>
        */
       
        // [ 2안 ] DCC WEB UI CSS 사용
        // 특정 name/id 같은거 넘겼을ㄸ ㅐ 해당 항목만 css에서 처리할 수 있는지 체크!!
        // css 다시 검토 + 이해
        <div className="roundrect_pagination">
            <div className="pagination">
                <a className="prev page-numbers">
                    <span className="icon-arrow-left" onClick={()=> paginate(pageNumbers[0])}>
                        <HiOutlineChevronDoubleLeft/>
                    </span>
                </a>    
                <a className="prev page-numbers">
                    <span className="icon-arrow-left" onClick={()=> onClickEvent('<', paginate, pageNumbers)}>
                        <HiOutlineChevronLeft/>
                    </span>
                </a>   
                {pageNumbers.map(number => (
                        <a key={number} className="page-numbers">
                            <span onClick={() => onClickEvent(number, paginate, pageNumbers)} className="page-link">
                                {number}
                            </span>
                        </a>
                    ))}
                <a className="next page-numbers">
                    <span className="icon-arrow-right" onClick={()=> onClickEvent('>', paginate, pageNumbers)}>
                        <HiOutlineChevronRight/>
                    </span>
                </a>    
                <a className="next page-numbers">
                    <span className="icon-arrow-right" onClick={()=> paginate(pageNumbers[pageNumbers.length-1])}>
                        <HiOutlineChevronDoubleRight/>
                    </span>
                </a>    
            </div>

        </div>

    );
};

export default Pagination;

/* [참고]
- inline: 가로나열, block 크기 지정 불가능, 요소 사이에 공백 없음
- lnline-block: 가로 나열, block 크기 지정 가능, 요소 사이에 공백 존재
- block: 세로 나열, 요소 사이에 공백 없음
*/