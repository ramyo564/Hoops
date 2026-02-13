export const diagrams = {
        "hoops-system-overview": `
            %%{init: {'flowchart': {'nodeSpacing': 26, 'rankSpacing': 28}}}%%
            graph LR
            subgraph Client [Client Layer]
                U[Client User]
            end

            subgraph Frontend [Frontend Layer]
                Vercel[Vercel Hosting]
                FEStack[React and TypeScript and Recoil and MUI]
                Axios[Axios REST calls]
                Stomp[WebSocket STOMP calls]
            end

            subgraph AWS [AWS Layer]
                subgraph AwsNetwork [Routing and TLS]
                    R53[Amazon Route53]
                    ELB[Amazon ELB]
                    ACM[AWS Certificate Manager]
                end

                subgraph AwsCompute [Compute and Runtime]
                    EC2[Amazon EC2]
                    subgraph Containers [Docker Container Runtime]
                        Spring[Spring Boot Container]
                        Redis[(Redis Container)]
                        Logs[(Docker Volume logs)]
                    end
                end

                subgraph AwsData [Managed Data Services]
                    RDS[(Amazon RDS MariaDB)]
                end
            end

            subgraph Delivery [CI and CD]
                GH[GitHub Repository]
                GHA[GitHub Actions]
                Hub[(Docker Hub)]
                Deploy[Self hosted runner on EC2]
                VDeploy[Vercel deployment]
            end

            U --> Vercel
            Vercel --> FEStack
            FEStack --> Axios
            FEStack --> Stomp
            Axios --> R53
            R53 --> Axios
            Stomp --> R53
            R53 --> Stomp

            R53 --> ELB
            ELB --> R53
            ACM --> ELB
            ELB --> ACM
            ELB --> EC2
            EC2 --> ELB

            EC2 --> Spring
            EC2 --> Redis
            Spring --> RDS
            RDS --> Spring
            Spring --> Redis
            Redis --> Spring
            Spring --> Logs

            GH --> GHA
            GHA --> Hub
            Hub --> Deploy
            Deploy --> EC2
            GH --> VDeploy
            VDeploy --> Vercel

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class U,Vercel,FEStack,Axios,Stomp b
            class R53,ELB,ACM,EC2,GH,GHA,Deploy,VDeploy o
            class Spring,Redis,Logs,RDS,Hub g
        `,

        architecture: `
            graph LR
            subgraph Client [Users]
                Web[Web Client]
                Mobile[Mobile Web]
            end

            subgraph Edge [API Edge]
                API[Spring Boot Backend]
                Sec[Spring Security]
            end

            subgraph Domain [Domain Services]
                Users[Users and Auth]
                Game[Game and Participants]
                Social[Friends and Invite]
                Chat[Chat and WebSocket]
                Gov[Reports and Manager]
                Alarm[Notifications SSE]
            end

            subgraph Data [Persistence]
                DB[(MariaDB)]
                Redis[(Redis)]
            end

            Web --> API
            Mobile --> API
            API --> Sec

            Sec --> Users
            API --> Game
            API --> Social
            API --> Gov
            API --> Chat
            API --> Alarm

            Users --> DB
            Game --> DB
            Social --> DB
            Gov --> DB
            Chat --> DB

            Users --> Redis
            Alarm --> Redis
            Chat --> Redis

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Web,Mobile,API,Sec b
            class Users,Game,Social,Chat,Gov,Alarm o
            class DB,Redis g
        `,

        'hoops-domain-map': `
            graph TB
            Root[com.zerobase.hoops] --> Users[users]
            Root --> GameCreator[gameCreator]
            Root --> GameUsers[gameUsers]
            Root --> Friends[friends]
            Root --> Invite[invite]
            Root --> Chat[chat]
            Root --> Alarm[alarm]
            Root --> Reports[reports]
            Root --> Manager[manager]
            Root --> Common[commonResponse and config and security]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Root b
            class Users,GameCreator,GameUsers,Friends,Invite,Chat,Alarm,Reports,Manager o
            class Common g
        `,

        'hoops-game-flow': `
            graph TB
            Creator[Game host] --> GC[GameController]
            GC --> GS[GameService]
            GS --> GR[GameRepository]
            GR --> DB[(MariaDB)]

            Player[Game user] --> GUC[GameUserController]
            GUC --> GUS[GameUserService]
            GUS --> Spec[Specification filters]
            Spec --> GR

            Host[Participant owner] --> PGC[ParticipantGameController]
            PGC --> PGS[ParticipantGameService]
            PGS --> PGR[ParticipantGameRepository]
            PGR --> DB

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Creator,Player,Host,GC,GUC,PGC b
            class GS,GUS,PGS,Spec o
            class GR,PGR,DB g
        `,

        'hoops-social-flow': `
            graph TB
            User[Authenticated user] --> FC[FriendController]
            FC --> FS[FriendService]
            FS --> FR[FriendRepository]

            User --> IC[InviteController]
            IC --> IS[InviteService]
            IS --> IR[InviteRepository]

            IS --> PGS[ParticipantGameService]
            PGS --> PGR[ParticipantGameRepository]
            FR --> DB[(MariaDB)]
            IR --> DB
            PGR --> DB

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class User,FC,IC b
            class FS,IS,PGS o
            class FR,IR,PGR,DB g
        `,

        'hoops-governance-flow': `
            graph TB
            Match[Match complete] --> Manner[GameUserService manner score]
            Manner --> MRepo[MannerPointRepository]
            MRepo --> DB[(MariaDB)]

            Reporter[User report] --> RC[ReportController]
            RC --> RS[ReportService]
            RS --> RRepo[ReportRepository]
            RRepo --> DB

            RS --> Notify[NotificationService]
            Notify --> SSE[SSE to managers]

            Manager[Manager action] --> MC[ManagerController]
            MC --> MS[ManagerService]
            MS --> BL[BlackListUserRepository]
            BL --> DB

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Match,Reporter,Manager,RC,MC b
            class Manner,RS,Notify,MS o
            class MRepo,RRepo,BL,DB,SSE g
        `,

        'hoops-chat-realtime': `
            graph TB
            Client[STOMP client] --> Conn[WebSocket connect]
            Conn --> Interceptor[ChannelInterceptor]
            Interceptor --> Auth[Token validation]

            Client --> ChatC[ChatController]
            ChatC --> ChatS[ChatService]
            ChatS --> RoomRepo[ChatRoomRepository]
            ChatS --> MsgRepo[MessageRepository]
            ChatS --> Sender[MessageSender]

            Sender --> Topic[Topic room broadcast]
            Sender --> Queue[Queue targeted history]
            MsgRepo --> DB[(MariaDB)]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Client,Conn,ChatC b
            class Interceptor,Auth,ChatS,Sender o
            class RoomRepo,MsgRepo,Topic,Queue,DB g
        `,

        'hoops-notification-sse': `
            graph LR
            Event[Domain event report invite] --> NS[NotificationService]
            NS --> NR[NotificationRepository]
            NS --> ER[EmitterRepository]
            NR --> DB[(MariaDB)]
            ER --> Redis[(Redis)]
            ER --> SSE[SSE stream]
            SSE --> Manager[Online manager]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Event,NS,SSE,Manager b
            class NR,ER o
            class DB,Redis g
        `,

        'hoops-auth-security': `
            graph TB
            Login[POST auth login] --> AC[AuthController]
            AC --> AS[AuthService]
            AS --> TP[TokenProvider issue JWT]
            AS --> AR[AuthRepository Redis]

            OAuth[Kakao OAuth2] --> OC[OAuth2Controller]
            OC --> OS[OAuth2Service]
            OS --> TP

            Request[API request] --> Filter[JwtAuthenticationFilter]
            Filter --> Sec[SecurityContext]
            Sec --> APIs[Protected APIs]

            CORS[CORS whitelist] --> WebSec[WebSecurityConfig]
            WebSec --> Filter

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Login,OAuth,Request,AC,OC,Filter b
            class AS,OS,TP,Sec,APIs o
            class AR,CORS,WebSec g
        `,

        'hoops-ws-security-fix': `
            graph TB
            Connect[STOMP CONNECT] --> Header[Read Authorization and gameId]
            Header --> Extract[JwtTokenExtract getUserFromToken]
            Extract --> Valid{Token valid}
            Valid -- no --> Reject[Reject connection]
            Valid -- yes --> Check[Participant membership check]
            Check --> Allowed{Approved member}
            Allowed -- no --> Block[Block websocket join]
            Allowed -- yes --> Accept[Allow room subscription]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Connect,Header,Extract,Check b
            class Valid,Allowed o
            class Reject,Block,Accept g
        `,

        'hoops-chat-history-fix': `
            graph LR
            Before[Before] --> B1[Load history]
            B1 --> B2[Publish to shared topic]
            B2 --> B3[Existing users receive duplicate messages]

            After[After] --> A1[Load history]
            A1 --> A2[Send history to personal queue]
            A2 --> A3[Only newcomer receives history]
            A3 --> A4[New realtime messages still use shared topic]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Before,B1,B2,After,A1,A2 b
            class B3,A3 o
            class A4 g
        `,

        'hoops-dynamic-search-spec': `
            graph TB
            Req[GET api games with query params] --> Build[Build Specification predicates]
            Build --> Repo[GameRepository findAll]
            Repo --> DB[(MariaDB)]
            Repo --> Page[Page result]
            Page --> DTO[Game search response DTO]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Req,Build,Repo b
            class Page,DTO o
            class DB g
        `,

        'hoops-common-dto-api': `
            graph LR
            View1[All games view] --> API[GET api games]
            View2[Address search view] --> API
            View3[Joined games view] --> API
            API --> Common[PageGameSearchResponses]
            Common --> FE[Frontend single rendering model]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class View1,View2,View3,API b
            class Common o
            class FE g
        `,

        'hoops-manner-concurrency': `
            graph TB
            U1[Evaluator A] --> Svc[GameUserService update manner]
            U2[Evaluator B] --> Svc
            U3[Evaluator C] --> Svc
            Svc --> Lock[PESSIMISTIC_WRITE lock]
            Lock --> Repo[MannerPointRepository]
            Repo --> DB[(MariaDB)]
            Repo --> Result[Consistent score update]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class U1,U2,U3,Svc b
            class Lock,Repo o
            class DB,Result g
        `,

        'hoops-jwt-component': `
            graph TB
            HTTP[HTTP controllers and services] --> Extract[JwtTokenExtract component]
            WS[WebSocket interceptor] --> Extract
            Extract --> Token[TokenProvider parse and validate]
            Extract --> UserRepo[UserRepository]
            Extract --> Principal[Unified authenticated user result]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class HTTP,WS,Extract b
            class Token,UserRepo o
            class Principal g
        `,

        'hoops-test-coverage': `
            graph TB
            Test[JUnit5 and Spring Boot Test] --> Ctrl[Controller tests]
            Test --> Svc[Service tests]
            Ctrl --> Domains[Game Invite Friend Report Manager User Chat]
            Svc --> Domains
            Domains --> Quality[Behavior regression guard]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Test,Ctrl,Svc b
            class Domains o
            class Quality g
        `,

        'hoops-docker-standardization': `
            graph LR
            Dev[Developer machine] --> Dockerfile[Dockerfile runtime spec]
            Dockerfile --> Image[Backend image]
            Image --> Local[Local docker compose]
            Image --> Server[EC2 docker runtime]
            Local --> Same[Same runtime behavior]
            Server --> Same

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Dev,Dockerfile,Image b
            class Local,Server o
            class Same g
        `,

        'hoops-multi-stage-build': `
            graph TB
            Src[Source code] --> Build[Builder stage gradle build]
            Build --> Jar[Application jar]
            Jar --> Runtime[Runtime stage minimal image]
            Runtime --> Size[Image reduced from 600MB to 250MB]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Src,Build,Jar b
            class Runtime o
            class Size g
        `,

        'hoops-github-actions-cicd': `
            graph LR
            Push[Push main] --> Workflow[GitHub Actions workflow]
            Workflow --> Build[Build and test]
            Build --> DockerHub[(Docker Hub)]
            DockerHub --> Deploy[Deployment stage]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Push,Workflow,Build b
            class DockerHub o
            class Deploy g
        `,

        'hoops-self-hosted-deploy': `
            graph TB
            CI[GitHub Actions] --> Runner[Self hosted runner EC2]
            Runner --> Login[Docker login]
            Login --> Pull[docker compose pull]
            Pull --> Up[docker compose up -d]
            Up --> Prune[old image prune]
            Up --> Service[Hoops backend online]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class CI,Runner,Login b
            class Pull,Up,Prune o
            class Service g
        `,

        'hoops-aws-cost-optimization': `
            graph LR
            Before[Before optimization] --> B1[ElastiCache + RDS public access]
            B1 --> B2[High monthly cost]

            After[After optimization] --> A1[Redis container on EC2]
            A1 --> A2[RDS private VPC access]
            A2 --> A3[Monthly cost reduced about 80 percent]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class Before,B1,After,A1 b
            class B2,A2 o
            class A3 g
        `,

        'hoops-rds-private-network': `
            graph LR
            Internet[Public internet] -. blocked .-> RDS[(RDS)]
            EC2[EC2 app runtime] --> VPC[VPC private subnet]
            VPC --> RDS
            EC2 --> SG[Security groups]
            SG --> RDS

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class EC2,VPC,SG b
            class RDS o
            class Internet g
        `,

        'hoops-redis-container-shift': `
            graph TB
            App[Hoops backend] --> RedisLocal[Redis container on EC2]
            App -. previous .-> Elasticache[Managed ElastiCache]
            RedisLocal --> Cost[Lower recurring cost]
            RedisLocal --> Control[Direct runtime control]

            classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
            classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
            classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
            class App,RedisLocal b
            class Elasticache o
            class Cost,Control g
        `
};
