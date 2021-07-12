/*-------------------- 메인/계정 메뉴 데이터 생성  --------------------------*/
export const menu_data = [     // 메인 메뉴 데이터
    { 
        main: [
            {
                name: '대시보드',
                url: '/#/',
            },
        ],
        sub: null,
    },
    {
        main: [
            {
                name: '서버 관리',
                url: '#',           // 링크 방지
            },
        ],
        sub: [
            {
                name: '서버 등록',
                url: '/#/server_regist',
                third: null,
            },            
            // {
            //     name: '일반 서버 등록',
            //     url: '/#/normal_server_regist',
            //     third: null,
            // },
            {
                name: '서버 목록 조회',
                url: '/#/server_list_search',
                third: null,
            },
            {
                name: '그룹 생성',
                url: '/#/group_create',
                third: null,
            },
            {
                name: '그룹 목록 조회',
                url: '/#/group_list_search',   
                third: null
                // [
                //     {
                //         name: '묶음 그룹 조회',
                //         url: '/#/bundle_group_search',
                //     },
                //     {
                //         name: '서버 그룹 조회',
                //         url: '/#/server_group_search',
                //     }
                // ],
            },
        ],
    },
    {
        main: [
            {
                name: '암호화',
                url: '#',          // 링크 방지
            },
        ],
        sub: [
            {
                name: '암호화 정책 생성',
                url: '/#/encryption_policy_create',
                third: null,
            },
            {
                name: '암호화 정책 조회',
                url: '/#/encryption_policy_search',
                third: null,
            },                        
        ],
    },
    {
        main: [
            {
                name: '로그',
                url: '#',         // 링크 방지
            },
        ],
        sub: [
            {
                name: '로그 조회',
                url: '/#/log_search',   
                third: null,
                // [
                //     {
                //         name: '감사 로그',
                //         url: '/#/audit_log',
                //     },
                //     {
                //         name: '접근 로그',
                //         url: '/#/access_log',
                //     },      
                //     {
                //         name: '시스템 로그',
                //         url: '/#/system_log',
                //     },                                                                
                // ],
            },                       
        ],
    },
    {
        main: [
            {
                name: '설정',
                url: '#',        // 링크 방지
            },
        ],
        sub: [
            {
                name: '설정 템플릿 생성',
                url: '/#/setup_template_create',
                third: null,
            },
            {
                name: '설정 템플릿 조회',
                url: '/#/setup_template_search',   
                third: null,
                // [
                //     {
                //         name: '제품별 탭',
                //         url: '/#/products_tab',
                //     },                                                                                                    
                // ],
            },   
            {
                name: 'DCC 기본 설정',
                url: '/#/dcc_basic_setup',
                third: null,
            },                   
            {
                name: '백업 설정',
                url: '#',         // 링크 방지
                third: [
                    {
                        name: 'DCC 백업',
                        url: '/#/dcc_backup',
                    },
                    {
                        name: '로그 백업 설정',
                        url: '/#/log_backup_setup',
                    },                                                                                     
                ],
            },
            {
                name: '연동 설정',
                url: '#',           // 링크 방지
                third: [
                    {
                        name: 'SG-KMS 연동',
                        url: '/#/kms_linkage',
                    },
                    {
                        name: 'Policy Server 연동',
                        url: '/#/policy_server_linkage',
                    },                                                                                     
                ],
            },            
            {
                name: '사용자 등록',
                url: '/#/user_regist',
                third: null,
            }, 
            {
                name: '사용자 조회',
                url: '/#/user_search',
                third: null,
            }, 
            {
                name: '유지보수 코드 관리',
                url: '/#/maintenance_code_management',
                third: null,
            },                           
            {
                name: 'UI 설정',
                url: '/#/ui_setup',
                third: null,
            },                                             
        ],
    },
];