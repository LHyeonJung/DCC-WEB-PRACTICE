
export interface IConnection
    {
        Ip: string;
        Port: BigInt;
        SessionId: string;
        ComponentId: string;
        UserId: string;
        IsBusy: boolean;
        IsConnected: boolean;
        ConnectionKey: [];
        // int Port { get; }
        // string SessionId { get; set; }
        // string ComponentId { get; set; }
        // string UserId { get; set; }
        // bool IsBusy { get; set; }
        // bool IsConnected { get; }
        // byte[] ConnectionKey { get; set; }

        Close(): void;
        // /// <summary>
        // /// UIAgent와 연결을 끊고 리소스 반환
        // /// </summary>
        // void Close();

        Open(): void;
        // /// <summary>
        // /// 동기 Connection 함수
        // /// 반드시 try,catch로 감싼 후 예외처리
        // /// 예외 : ArgumentNullException, SoketException 등등
        // /// </summary>
        // /// <returns> Type: System.Threading.Tasks.Task - Task 반환 /// </returns>
        // void Open();

        OpenAsync(): void; // Task
        // /// <summary>
        // /// 비동기 Connection 함수
        // /// 반드시 try,catch로 감싼 후 예외처리
        // /// 예외 : ArgumentNullException, SoketException 등등
        // /// </summary>
        // /// <returns> Type: System.Threading.Tasks.Task - Task 반환 /// </returns>
        // System.Threading.Tasks.Task OpenAsync();

        ReceiveAsync(): void; // Task<DcpObject>
        // /// <summary>
        // /// 비동기 Receieve
        // /// 반드시 try,catch로 감싼 후 예외처리
        // /// 예외 : ArgumentNullException, SoketException 등등
        // /// </summary>
        // /// <returns></returns>
        // System.Threading.Tasks.Task<DcpObject> ReceiveAsync();

        SendAsync(string): void; // Task
        // /// <summary>
        // /// 비동기 Send
        // /// 반드시 try,catch로 감싼 후 예외처리
        // /// </summary>
        // /// <param name="dcpObject"></param>
        // /// <returns></returns>
        // System.Threading.Tasks.Task SendAsync(DcpObject dcpObject);
    }