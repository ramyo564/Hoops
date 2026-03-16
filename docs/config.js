import { diagrams } from './diagrams.js';
import { learnMoreLinks } from './learnmore-links.js';

const cardMeta = {
    "hoops-domain-map": { title: "도메인 패키지 구조", description: "도메인 주도 설계를 기반으로 users, game, chat, invite, friends, alarm, reports, manager 등으로 패키지를 분리하여 응집도를 높였습니다.", cardClass: "backend-card" },
    "hoops-game-flow": { title: "경기 관리 워크플로우", description: "경기 생성, 동적 필터링, 참가 승인/거절 및 시작 관리를 전용 서비스와 리포지토리 계층을 통해 모델링했습니다.", cardClass: "backend-card" },
    "hoops-social-flow": { title: "소셜 도메인 흐름", description: "친구 및 초대 워크플로우를 경기 참여와 연결하여 사용자가 팀원을 모집하고 참여 상태를 조율할 수 있도록 설계했습니다.", cardClass: "backend-card" },
    "hoops-governance-flow": { title: "신고 및 거버넌스", description: "신고 접수, 관리자 검토, 블랙리스트 조치 및 매너 점수 업데이트를 포함한 커뮤니티 품질 관리 워크플로우입니다.", cardClass: "backend-card" },
    "hoops-chat-realtime": { title: "실시간 채팅 아키텍처", description: "WebSocket + STOMP 기반의 메시징 시스템으로, 방별 채팅 유지 및 중복 없는 이력 전송을 지원합니다.", cardClass: "backend-card" },
    "hoops-notification-sse": { title: "SSE 알림 파이프라인", description: "서버 전송 이벤트(SSE)를 통해 관리자에게 신고 발생 등 크리티컬한 액션을 실시간으로 전달합니다.", cardClass: "backend-card" },
    "hoops-auth-security": { title: "JWT + OAuth2 보안", description: "JWT 필터를 통한 API 보호, 카카오 OAuth2 로그인 및 CORS 화이트리스트 정책으로 외부 접근을 제어합니다.", cardClass: "backend-card" },
    "hoops-ws-security-fix": { title: "WebSocket 보안 강화", description: "ChannelInterceptor 기반의 인가 계층을 구축하여 토큰 소유권과 경기 참여 여부를 검증하고 비인가 접근을 차단합니다.", cardClass: "backend-card" },
    "hoops-chat-history-fix": { title: "채팅 이력 전송 최적화", description: "공용 토픽과 유저별 개인 큐 전송 경로를 분리하여 재입장 시 발생하던 메시지 중복 수신 문제를 해결했습니다.", cardClass: "frontend-card" },
    "hoops-dynamic-search-spec": { title: "동적 검색 Specification", description: "JPA Specification을 활용해 다중 조건 검색을 표준화하고 if-else 분기 폭증과 엔드포인트 파편화를 방지했습니다.", cardClass: "frontend-card" },
    "hoops-common-dto-api": { title: "단일 엔드포인트 + 공통 DTO", description: "다양한 경기 목록 시나리오를 하나의 API로 통합하고 일관된 응답 모델을 제공하여 프론트엔드 연동 복잡도를 낮췄습니다.", cardClass: "frontend-card" },
    "hoops-manner-concurrency": { title: "매너 점수 동시성 제어", description: "비관적 락(Pessimistic Locking)을 적용해 동시 다발적인 평점 업데이트 상황에서도 데이터 정합성을 보장합니다.", cardClass: "frontend-card" },
    "hoops-jwt-component": { title: "재사용 가능한 인증 컴포넌트", description: "인증 파싱 로직을 중앙화하여 HTTP와 WebSocket 컨텍스트 모두에서 검증 가능한 구조로 개선했습니다.", cardClass: "frontend-card" },
    "hoops-test-coverage": { title: "컨트롤러 및 서비스 테스트", description: "경기, 초대, 친구, 관리자, 신고, 사용자, 채팅 등 주요 도메인 전반에 걸친 테스트 코드로 회귀 결함을 방지합니다.", cardClass: "frontend-card" },
    "hoops-docker-standardization": { title: "Docker 환경 표준화", description: "백엔드 런타임을 컨테이너화하여 로컬과 서버 간의 환경 격차를 제거하고 동일한 실행 환경을 보장합니다.", cardClass: "devops-card" },
    "hoops-multi-stage-build": { title: "멀티스테이지 빌드 최적화", description: "빌드와 런타임 레이어를 분리하여 이미지 크기를 600MB에서 250MB로 58% 절감하고 배포 속도를 향상했습니다.", cardClass: "devops-card" },
    "hoops-github-actions-cicd": { title: "GitHub Actions CI/CD", description: "Push 발생 시 자동 빌드, Docker Hub 업로드 및 EC2 배포를 연동하여 안정적인 배포 파이프라인을 구축했습니다.", cardClass: "devops-card" },
    "hoops-self-hosted-deploy": { title: "Self-hosted Runner 배포", description: "EC2 내 자체 러너를 통해 외부 노출 없이 pull/up/prune 단계를 수행하는 제로 터치 배포 환경을 구성했습니다.", cardClass: "devops-card" },
    "hoops-aws-cost-optimization": { title: "AWS 비용 최적화", description: "인프라 정책 조정 및 아키텍처 재설계를 통해 안정성을 유지하며 월 운영 비용을 약 80% 절감했습니다.", cardClass: "devops-card" },
    "hoops-rds-private-network": { title: "RDS 프라이빗 네트워크 모델", description: "DB의 공용 노출을 제거하고 VPC 내 프라이빗 서브넷 통신으로 전환하여 보안 수준을 높였습니다.", cardClass: "devops-card" },
    "hoops-redis-container-shift": { title: "ElastiCache의 컨테이너 전환", description: "관리형 ElastiCache를 EC2 내 Docker 컨테이너 Redis로 대체하여 예산 범위를 준수하고 운영 통제권을 확보했습니다.", cardClass: "devops-card" },
};

const mapCards = (ids) => ids.map((id) => ({
    mermaidId: id,
    title: cardMeta[id]?.title ?? id,
    description: cardMeta[id]?.description ?? '',
    links: [
        { label: 'EVIDENCE', href: `./evidence/hoops/index.html#${id}`, variant: 'primary' },
        { label: 'README', href: learnMoreLinks[id] ?? '#', variant: 'ghost' }
    ],
    cardClass: cardMeta[id]?.cardClass ?? ''
}));

export const templateConfig = {
    system: {
        documentTitle: 'Yohan | Hoops 백엔드 아키텍트',
        systemName: "YOHAN_HOOPS_BACKEND_V.1.0"
    },

    hero: {
        sectionId: 'system-architecture',
        panelTitle: "SYSTEM_ARCHITECTURE",
        panelUid: "ID: HOOPS-SYS-00",
        diagramId: 'hoops-system-overview',
        metrics: [
            "Architecture: Layered (Controller-Service-Repository) for Scalability",
            "Real-time: WebSocket(STOMP) + SSE Multi-channel Messaging",
            "Result: Deploy Time 80% Reduction (15m -> 3m), Image 58% Size Down",
            "Governance: Real-time Ban Enforcement with Redis Blacklist",
            "Security: JWT + OAuth2 (Kakao) + WebSocket Channel Interceptor",
            "Maintenance: JPA Specification Standardization for Dynamic Queries"
        ],
        quickLinks: [
            { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/Hoops-portfolio/', variant: 'primary' },
            { label: 'GITHUB_REPO', href: 'https://github.com/ramyo564/Hoops', variant: 'secondary' },
            { label: 'PORTFOLIO_HUB', href: 'https://ramyo564.github.io/Portfolio/', variant: 'ghost' }
        ]
    },

    topPanels: [
        {
            sectionId: 'backend-architecture',
            panelTitle: "BACKEND_ARCHITECTURE",
            panelUid: "ID: HOOPS-BE-01",
            diagramId: 'architecture',
            navLabel: '백엔드 구조',
            panelClass: 'backend-architecture-panel',
            metrics: [
                "팀 프로젝트: 7인 구성 (프론트 3 / 백엔드 4), 2024.04 ~ 2024.08",
                "수행 역할: 백엔드 설계 및 구현, CI/CD 자동화, 인프라 최적화",
                "배포 시간: 15분 이상의 수동 절차를 3분 이내 자동화 파이프라인으로 단축",
                "이미지 크기: Docker 이미지 최적화를 통해 600MB에서 250MB로 58% 절감",
                "인프라 비용: AWS 월간 운영 비용 약 80% 절감 달성"
            ]
        }
    ],

    skills: {
        sectionId: 'skill-set',
        panelTitle: 'SKILL_SET',
        panelUid: 'ID: STACK-MAP',
        items: [
            { title: "BACKEND CORE", stack: "JDK 17, Spring Boot 3.1, Spring Security, JPA" },
            { title: "REALTIME", stack: "WebSocket, STOMP, SSE, ChannelInterceptor, 이벤트 기반 메시징" },
            { title: "SECURITY", stack: "JWT, Kakao OAuth2, CORS 화이트리스트, 동적 블랙리스트 제어" },
            { title: "DATA LAYER", stack: "MariaDB, Redis, Specification 기반 필터링, 비관적 락" },
            { title: "DEVOPS", stack: "Docker, Docker Compose, GitHub Actions, AWS EC2/RDS/Route53" },
            { title: "QUALITY", stack: "JUnit5, Spring Boot Test, 컨트롤러/서비스 테스트, Swagger" },
        ]
    },

    serviceSections: [
        {
            id: 'architecture-quick-scan',
            title: 'ARCHITECTURE_QUICK_SCAN',
            navLabel: 'QUICK_SCAN',
            theme: 'blue',
            recruiterBrief: {
                kicker: 'CORE_SYSTEM_PILLARS',
                title: 'Hoops 시스템 설계 핵심 요약 (Architecture Overview)',
                cases: [
                    {
                        id: 'Realtime',
                        title: '실시간 메시징 정합성 확보',
                        problem: '메시지 타입 혼선 및 재입장 시 이력 중복 노출 이슈',
                        action: 'STOMP 목적지(Destination) 분리 및 유저별 세션 라우팅 가드 구축',
                        impact: '실시간 채팅 무결성 확보 및 사용자 경험(UX) 안정화',
                        links: [{ label: 'SHOW_REALTIME_DETAILS', href: '#hoops-chat-realtime' }]
                    },
                    {
                        id: 'Security',
                        title: '다층 보안 거버넌스 체계',
                        problem: '인증 이후의 실시간 세션 제재 공백 및 비인가 접근 리스크',
                        action: 'WebSocket Interceptor 기반 블랙리스트/참여여부 강제 인가 연동',
                        impact: '악성 사용자 즉각 격리 및 비인가 접근 100% 차단 실현',
                        links: [{ label: 'SHOW_SECURITY_DETAILS', href: '#hoops-ws-security-fix' }]
                    },
                    {
                        id: 'Query',
                        title: '동적 쿼리 엔진 표준화',
                        problem: '다양한 검색 조건 증가로 인한 코드 스파게티 및 유지보수성 저하',
                        action: 'JPA Specification 기반 쿼리 합성 구조 도입 및 엔드포인트 단일화',
                        impact: '쿼리 로직 90% 표준화 및 신규 조건 추가 생산성 극대화',
                        links: [{ label: 'SHOW_QUERY_DETAILS', href: '#hoops-dynamic-search-spec' }]
                    },
                    {
                        id: 'DevOps',
                        title: '배포 파이프라인 고도화',
                        problem: '수동 배포 환경의 인적 오류 리스크 및 긴 리드타임',
                        action: 'Multi-stage 빌드 적용 및 GitHub Actions 기반 자동화 루프 구축',
                        impact: '배포 시간 80% 단축 및 이미지 크기 58% 절감 (600MB -> 250MB)',
                        links: [{ label: 'SHOW_DEVOPS_DETAILS', href: '#hoops-multi-stage-build' }]
                    }
                ],
                links: [
                    { label: 'PROBLEM_SOLVING', href: 'https://ramyo564.github.io/Hoops-portfolio/', variant: 'primary' }
                ]
            }
        },
        {
            id: 'backend-services',
            title: 'BACKEND_SERVICES',
            navLabel: '백엔드 서비스',
            theme: 'blue',
            cardVisualHeight: '290px',
            cardClass: 'backend-card',
            groups: [
                {
                    title: "CORE DOMAINS",
                    desc: "사용자/인증 / 경기 / 소셜 / 거버넌스",
                    cards: mapCards(["hoops-domain-map", "hoops-game-flow", "hoops-social-flow", "hoops-governance-flow"])
                },
                {
                    title: "REALTIME & SECURITY",
                    desc: "채팅 / 알림 / 인증-인가 / WebSocket 가드",
                    cards: mapCards(["hoops-chat-realtime", "hoops-notification-sse", "hoops-auth-security", "hoops-ws-security-fix"])
                }
            ]
        },
        {
            id: 'engineering-cases',
            title: 'ENGINEERING_CASES',
            navLabel: '엔지니어링 케이스',
            theme: 'green',
            cardVisualHeight: '260px',
            cardClass: 'frontend-card',
            cards: mapCards(["hoops-chat-history-fix", "hoops-dynamic-search-spec", "hoops-common-dto-api", "hoops-manner-concurrency", "hoops-jwt-component", "hoops-test-coverage"])
        },
        {
            id: 'devops-services',
            title: 'DEVOPS_SERVICES',
            navLabel: '데브옵스 서비스',
            theme: 'orange',
            cardVisualHeight: '265px',
            cardClass: 'devops-card',
            groups: [
                {
                    title: "DELIVERY PIPELINE",
                    desc: "Docker 빌드 / GitHub Actions / Self-hosted 배포",
                    cards: mapCards(["hoops-docker-standardization", "hoops-multi-stage-build", "hoops-github-actions-cicd", "hoops-self-hosted-deploy"])
                },
                {
                    title: "COST & INFRA OPTIMIZATION",
                    desc: "네트워크 강화 / Redis 전략 / 월 비용 절감",
                    cards: mapCards(["hoops-aws-cost-optimization", "hoops-rds-private-network", "hoops-redis-container-shift"])
                }
            ]
        }
    ],

    contact: {
        sectionId: 'contact',
        panelTitle: 'CONTACT',
        panelUid: 'ID: COMMS-01',
        description: "Submit transmission to initiate collaboration.",
        actions: [
            { label: 'GITHUB_REPO', href: 'https://github.com/ramyo564/Hoops' },
            { label: "SEND_EMAIL", href: "mailto:yohan032yohan@gmail.com" },
            { label: "GITHUB", href: "https://github.com/ramyo564" },
            { label: "EVIDENCE", href: "./evidence/hoops/index.html" },
            { label: "YOUTUBE", href: "https://www.youtube.com/@yohanjang-xe9td" },
        ]
    },

    mermaid: {
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'Inter',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'linear'
        }
    },

    diagrams
};
