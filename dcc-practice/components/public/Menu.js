import { menu_data } from '../../data/menu_array.js';

const CreateMenu = {

    /*-------------------- 메인/계정 메뉴 UI 생성하기  --------------------------*/
    createMenuUi : () => {
        
        var main_menu_area = document.getElementsByClassName('main-menu')[0];   // 메인 메뉴 영역
        var ul = document.createElement('ul');    // 메인메뉴의 서브메뉴 영역

        if ( menu_data !== null ) {      // menu_array.js 의 JSON menu_data 배열이 존재하면

            for ( var i = 0; i < menu_data.length; i++ ) {    // 1 Depth 길이 만큼 반복
                var li = document.createElement('li');
                var a = document.createElement('a');     // 1 Depth 메뉴 링크
                a.textContent = menu_data[i].main[0].name;    // 메뉴 text 연결
                a.setAttribute('href', menu_data[i].main[0].url);     // 2 Depth 가 없으면 바로 url 연결

                if ( menu_data[i].sub !== null ) {            // 2 Depth 가 있는 1 Depth 라면  
                    a.setAttribute('onclick', 'return false;');        // 링크 방지 속성 삽입하여 클릭 이벤트 생성
                    $(a).css('cursor', 'default');       // 커서 화살표로 변경
                    $(a).append('<span class="icon-arrow-down">&#xE001;</span>');  // v 아이콘 추가
                }
                li.append(a);      // li > a 태그 생성

                if ( menu_data[i].sub !== null ) {     // 2 Depth 메뉴가 존재하면
                    var sub_ul = document.createElement('ul');     // 2 Depth 메뉴 영역 생성

                    for ( var j = 0; j < menu_data[i].sub.length; j++ ) {   // 2 Depth 메뉴 길이 만큼 반복
                        var sub_li = document.createElement('li');       // li 와 
                        var sub_a = document.createElement('a');         // a 태그 생성 
                        sub_a.textContent = menu_data[i].sub[j].name;     // 메뉴 text 연결
                        sub_a.setAttribute('href', menu_data[i].sub[j].url);     // url 연결
                        sub_li.append(sub_a);
                        sub_ul.append(sub_li);

                        if ( menu_data[i].sub[j].third != null ) {   // 3 Depth 메뉴가 존재하면 
                            sub_a.setAttribute('onclick', 'return false;');        // 링크 방지 속성 삽입하여 클릭 이벤트 생성
                            $(sub_a).css('cursor', 'default');       // 커서 화살표로 변경
                            $(sub_a).append('<span class="icon-arrow-right">&#xE001;</span>');  // > 아이콘 추가

                            var third_ul = document.createElement('ul');     // 3 Depth 메뉴 영역 생성

                            for ( var k = 0; k < menu_data[i].sub[j].third.length; k++ ) {   // 3 Depth 메뉴 길이 만큼 반복
                                var third_li = document.createElement('li');       // li 와 
                                var third_a = document.createElement('a');         // a 태그 생성 
                                third_a.textContent = menu_data[i].sub[j].third[k].name;     // 메뉴 text 연결
                                third_a.setAttribute('href', menu_data[i].sub[j].third[k].url);     // url 연결
                                third_li.append(third_a);
                                third_ul.append(third_li);
                            }
                            sub_li.append(third_ul);     // 2 Depth a 태그 뒤에 3 Depth 장착
                        }

                    }
                    li.append(sub_ul);       // 각각의 2 Depth 링크 장착

                } 
                ul.append(li);     // 2 Depth 모든 메뉴 그룹 생성

            }

            main_menu_area.append(ul);     // 마지막으로 1 Deoth 메뉴 영역에 2 Depth 장착
        }
    }    

}

export default CreateMenu;