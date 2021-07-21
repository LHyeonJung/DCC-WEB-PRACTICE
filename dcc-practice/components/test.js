import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addUserAction} from '../reducers/user';

const EnrollUser = () => {

    const dispatch = useDispatch(); // dispatch를 쉽게 사용하게 하는 hook
    const userList = useSelector(state => state.user.userList); // store의 state.saList를 불러오는 hook 

    const [inputUserInfo, setInputUserInfo] = useState({
        id: '',
        pass: '',
        isSuperUser: '',
        isSecurityAgent: '',
        role: '',
        isOTP: '',
        isignOTPShared: '',
        info: ''
    })

    function onChangeInput(e){
        const { name, value } = e.target;
        console.log("name: "+ name);
        console.log("value: "+ value);
        setInputUserInfo({
            ...inputUserInfo,
            [name]: value
        });
    }
    
    // useCallback은 최적화를 위한 hook 
    const onClickAdd = useCallback(()=> {
        dispatch(addUserAction(inputUserInfo));
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default EnrollUser;


///////////////////////////

import _ from 'lodash';

import React from 'react';

import PropTypes from 'prop-types';

import axios from 'axios';



import {Button, Label, Input, Table, Menu, Icon, Divider} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';



class AssetsTable extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

        assets : [],

        filtered : [],

        filter : null,

        column : null,

        direction : null,

        sidx : 0,

     }

    this.handlePage = this.handlePage.bind(this);

    this.onSearchChange = this.onSearchChange.bind(this);

    this.onClickButtonForFetch = this.onClickButtonForFetch.bind(this);

  }



  // table callbacks



 handleSort = clickedColumn => () => {  // 함수가 정의되어 리턴된다.

     const { column, filtered, direction, sidx} = this.state;

     const maxRows = parseInt(this.props.maxRows);

     if (column !== clickedColumn) {

        this.setState({

           column : clickedColumn,

           filtered : _.sortBy(filtered, [clickedColumn]), // 눌러진 컬럼이 이전과 다를 경우, 새로 정렬함

           direction : 'ascending',                         //    기본 오름차순

           sidx : 0,

        });

       return;

     }

     this.setState({

      filtered : filtered.reverse(), // 같은 컬럼을 눌렀을 경우, 정렬을 반대로 함

      direction : direction === 'ascending' ? 'descending' : 'ascending',

      sidx : 0,

    });

  }



  handlePage(e,data) {

      const {sidx, filtered} = this.state;

      const {maxRows} = this.props;

      this.setState({sidx : data['index']*maxRows});

  }



  // fetch callbacks

  onClickButtonForFetch(e) {

    const maxRows = parseInt(this.props.maxRows);  // 정수변환

    this.fetchButton.ref.classList.add('loading');

    //console.log(this.fetchButton.ref.classList);

    axios.get('/api/assets').then((result) => {

            if (result.status === 200) {

                this.setState({value: true, assets:result.data, filtered:result.data, sidx : 0});

                if ((result.data.length / maxRows) > maxPages) {

                    this.setState({numPage : maxPages});

                }

                else {

                    this.setState({numPage : result.data.length / maxRows});

                }

                this.searchInput.inputRef.value = "";

            }

            else {

                alert('get error: ' + result.status);

            }

            this.fetchButton.ref.classList.remove('loading');

        }) // then

        .catch((result)=> {

            this.fetchButton.ref.classList.remove('loading');

        });

   }


onSearchChange(e) {

        //console.log(e.target.value);

        const {sidx, assets, filtered, filter, column, direction} = this.state;

        const maxRows = parseInt(this.props.maxRows);

        var newFiltered = [];

        assets.forEach(item=> {

             var found = false;

             Object.keys(item).forEach(key => {if (item[key].includes(e.target.value) ) { found = true; }});

             if (found) {

                newFiltered.push(item);

             }

           });

        if (column) {

            newFiltered =   _.sortBy(newFiltered, [column]);  // 이전에 특정 컬럼에 대한 정렬 상태면 정렬 시킨다.

            if (direction  === 'descending') { // 정렬이 내림차순일 경우 reverse 시킨다.

                newFiltered = newFiltered.reverse();

            }

        }

        this.setState( {

                        filtered : newFiltered,

                        filter : e.target.value,

                        sidx : 0 } );

   }





  // main render

  render() {

   const { column, filtered, direction, sidx} = this.state;

    const maxRows = parseInt(this.props.maxRows);

    var totalPage = Math.ceil(filtered.length / maxRows);

    if (totalPage === 0) {

        totalPage = 1;

    }

    var curPage = sidx / maxRows;

    return (

     <div class='ui' as='a'>

    <Button basic ref={param => this.fetchButton = param} color="orange" onClick={this.onClickButtonForFetch}> 불러오기 </Button>

     <Input icon='search' actionPosition='right'  placeholder='검색...' onChange={this.onSearchChange} ref={param=> this.searchInput = param}/>

     <Label as='a' />

     <Label as='a' color='teal' pointing='below' size='large' > {filtered.length} </Label>

     <Pagination floated='right' defaultActivePage={curPage+1} totalPages={totalPage} onPageChange={this.handlePage} />

     <Table className="AssetsTable" sortable celled fixed unstackable>

        <Table.Header>

            <Table.Row>

               <Table.HeaderCell sorted={column==='user' ? direction : null} onClick={this.handleSort('user')}>사용부서</Table.HeaderCell>

               <Table.HeaderCell sorted={column==='id' ? direction : null} onClick={this.handleSort('id')}>자산번호</Table.HeaderCell>

               <Table.HeaderCell sorted={column==='name' ? direction : null} onClick={this.handleSort('name')}>자산명</Table.HeaderCell>

               <Table.HeaderCell sorted={column==='date' ? direction : null} onClick={this.handleSort('date')}>취득일</Table.HeaderCell>

               <Table.HeaderCell sorted={column==='location' ? direction : null} onClick={this.handleSort('location')}>자산위치</Table.HeaderCell>

               <Table.HeaderCell sorted={column==='etc' ? direction : null} onClick={this.handleSort('etc')}>비고</Table.HeaderCell>

            </Table.Row>

        </Table.Header>

        <Table.Body styles={{'max-height':'85vh'}}>

           { _.map( filtered.slice(sidx,sidx+maxRows),({user,id,name,date,location,etc})  =>

                  <Table.Row key={id}>

                     <Table.Cell>{user}</Table.Cell>

                     <Table.Cell>{id}</Table.Cell>

                     <Table.Cell>{name}</Table.Cell>

                     <Table.Cell>{date}</Table.Cell>

                     <Table.Cell>{location}</Table.Cell>

                     <Table.Cell>{etc}</Table.Cell>

                  </Table.Row>

              )}

        </Table.Body>

     </Table>

     </div>

    );

  }

}



export default AssetsTable;