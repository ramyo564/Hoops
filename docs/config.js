import { diagrams } from './diagrams.js';
import { learnMoreLinks } from './learnmore-links.js';

const cardMeta = {
    "hoops-domain-map": { title: "Domain Package Map", description: "Package structure is split by domain boundaries: users, game, chat, invite, friends, alarm, reports, and manager.", cardClass: "backend-card" },
    "hoops-game-flow": { title: "Game Management Flow", description: "Game creation, dynamic filtering, participant approval/reject, and kickoff management are modeled through dedicated service and repository layers.", cardClass: "backend-card" },
    "hoops-social-flow": { title: "Social Domain Flow", description: "Friend and invite workflows are connected to game participation so users can recruit teammates and coordinate game entry states.", cardClass: "backend-card" },
    "hoops-governance-flow": { title: "Report & Governance", description: "Report submissions, manager review, blacklist actions, and manner score updates form moderation workflows for community quality control.", cardClass: "backend-card" },
    "hoops-chat-realtime": { title: "Realtime Chat Architecture", description: "WebSocket + STOMP messaging supports room chat, persistence, and targeted history delivery for users joining in progress.", cardClass: "backend-card" },
    "hoops-notification-sse": { title: "SSE Notification Pipeline", description: "Notification service emits server-sent events to online managers so critical actions like reports are surfaced immediately.", cardClass: "backend-card" },
    "hoops-auth-security": { title: "JWT + OAuth2 Security", description: "API requests are protected by JWT filters, while OAuth2 login and CORS whitelist policies enforce external access control.", cardClass: "backend-card" },
    "hoops-ws-security-fix": { title: "WebSocket Security Fix", description: "A ChannelInterceptor-based authorization layer blocks unauthorized chat room access by validating token ownership against participant membership.", cardClass: "backend-card" },
    "hoops-chat-history-fix": { title: "Chat History Delivery Fix", description: "Duplicate history broadcasts were removed by separating public topic streams from per-user queue delivery channels for new entrants.", cardClass: "frontend-card" },
    "hoops-dynamic-search-spec": { title: "Dynamic Search Specification", description: "Specification-based query composition handles multi-condition game search without exploding if-else branches or endpoint sprawl.", cardClass: "frontend-card" },
    "hoops-common-dto-api": { title: "Single Endpoint + Common DTO", description: "`GET /api/games` consolidates varied listing scenarios into one endpoint with a consistent response model for frontend simplicity.", cardClass: "frontend-card" },
    "hoops-manner-concurrency": { title: "Manner Point Concurrency", description: "Pessimistic locking ensures score consistency under concurrent evaluations, preventing lost updates during post-game rating bursts.", cardClass: "frontend-card" },
    "hoops-jwt-component": { title: "Reusable JwtTokenExtract", description: "Authentication parsing is centralized into a reusable component to improve testability, reduce duplication, and support both HTTP and WebSocket contexts.", cardClass: "frontend-card" },
    "hoops-test-coverage": { title: "Controller & Service Tests", description: "The project includes focused controller/service tests across game, invite, friend, manager, report, user, and chat scenarios.", cardClass: "frontend-card" },
    "hoops-docker-standardization": { title: "Docker Standardization", description: "Backend runtime is containerized for consistent local/server environments, eliminating machine-specific setup drift.", cardClass: "devops-card" },
    "hoops-multi-stage-build": { title: "Multi-stage Build Optimization", description: "Build/runtime separation trims image size from ~600MB to ~250MB, reducing registry transfer and deployment time.", cardClass: "devops-card" },
    "hoops-github-actions-cicd": { title: "GitHub Actions CI/CD", description: "Push to main triggers build, Docker Hub publish, and deployment orchestration, turning repetitive manual operations into a stable pipeline.", cardClass: "devops-card" },
    "hoops-self-hosted-deploy": { title: "Self-hosted Runner Deploy", description: "A self-hosted EC2 runner performs pull/up/prune steps for near-zero-touch deployments and controlled runtime updates.", cardClass: "devops-card" },
    "hoops-aws-cost-optimization": { title: "AWS Cost Optimization", description: "Infrastructure policy adjustments reduced monthly operational cost by roughly 80% while retaining a stable deployment environment.", cardClass: "devops-card" },
    "hoops-rds-private-network": { title: "RDS Private Access Model", description: "RDS public exposure was removed in favor of private VPC-only connectivity, improving security posture and reducing unnecessary network cost.", cardClass: "devops-card" },
    "hoops-redis-container-shift": { title: "ElastiCache to Container Redis", description: "Redis workload moved from managed ElastiCache to controlled Docker runtime on EC2 for better budget alignment and predictable operations.", cardClass: "devops-card" },
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
        documentTitle: 'Yohan | Hoops Backend Architect',
        systemName: "YOHAN_HOOPS_BACKEND_V.1.0"
    },

    hero: {
        sectionId: 'system-architecture',
        panelTitle: "SYSTEM_ARCHITECTURE",
        panelUid: "ID: HOOPS-SYS-00",
        diagramId: 'hoops-system-overview',
        metrics: ["SERVICE: Location-based real-time basketball matching community platform", "CHANNELS: REST API + WebSocket(STOMP) + SSE notification stream", "CORE FLOWS: game management, invite/friend social graph, report/blacklist governance", "DELIVERY: GitHub Actions -> Docker Hub -> EC2 Self-hosted deployment pipeline", "DATA LAYER: MariaDB as source of truth, Redis for auth/session/emitter workflows"]
    },

    topPanels: [
        {
            sectionId: 'backend-architecture',
            panelTitle: "BACKEND_ARCHITECTURE",
            panelUid: "ID: HOOPS-BE-01",
            diagramId: 'architecture',
            navLabel: 'BACKEND_ARCHITECTURE',
            panelClass: 'backend-architecture-panel',
            metrics: ["TEAM PROJECT: 7 members (Frontend 3 / Backend 4), 2024.04 ~ 2024.08", "MY ROLE: Backend design and implementation, CI/CD automation, infrastructure optimization", "DEPLOY TIME: 15m+ manual process -> under 3m automated pipeline", "IMAGE SIZE: Docker image optimized from 600MB -> 250MB (-58%)", "COST: AWS monthly infrastructure reduced by approximately 80%"]
        }
    ],

    skills: {
        sectionId: 'skill-set',
        panelTitle: 'SKILL_SET',
        panelUid: 'ID: STACK-MAP',
        items: [
            { title: "BACKEND CORE", stack: "JDK 17, Spring Boot 3.1, Spring Security, JPA, QueryDSL" },
            { title: "REALTIME", stack: "WebSocket, STOMP, SSE, ChannelInterceptor, event-driven messaging" },
            { title: "SECURITY", stack: "JWT, Kakao OAuth2, CORS whitelist policy, dynamic blacklist control" },
            { title: "DATA LAYER", stack: "MariaDB, Redis, Specification-based filtering, pessimistic locking" },
            { title: "DEVOPS", stack: "Docker, Docker Compose, GitHub Actions, AWS EC2/RDS/Route53" },
            { title: "QUALITY", stack: "JUnit5, Spring Boot Test, controller/service test coverage, Swagger" },
        ]
    },

    serviceSections: [
        {
            id: 'backend-services',
            title: 'BACKEND_SERVICES',
            navLabel: 'BACKEND_SERVICES',
            theme: 'blue',
            cardVisualHeight: '290px',
            cardClass: 'backend-card',
            groups: [
                {
                    title: "CORE DOMAINS",
                    desc: "Users/Auth / Game / Social / Governance",
                    cards: mapCards(["hoops-domain-map", "hoops-game-flow", "hoops-social-flow", "hoops-governance-flow"])
                },
                {
                    title: "REALTIME & SECURITY",
                    desc: "Chat / Notifications / AuthN-AuthZ / WebSocket Guard",
                    cards: mapCards(["hoops-chat-realtime", "hoops-notification-sse", "hoops-auth-security", "hoops-ws-security-fix"])
                }
            ]
        },
        {
            id: 'engineering-cases',
            title: 'ENGINEERING_CASES',
            navLabel: 'ENGINEERING_CASES',
            theme: 'green',
            cardVisualHeight: '260px',
            cardClass: 'frontend-card',
            cards: mapCards(["hoops-chat-history-fix", "hoops-dynamic-search-spec", "hoops-common-dto-api", "hoops-manner-concurrency", "hoops-jwt-component", "hoops-test-coverage"])
        },
        {
            id: 'devops-services',
            title: 'DEVOPS_SERVICES',
            navLabel: 'DEVOPS_SERVICES',
            theme: 'orange',
            cardVisualHeight: '265px',
            cardClass: 'devops-card',
            groups: [
                {
                    title: "DELIVERY PIPELINE",
                    desc: "Docker Build / GitHub Actions / Self-hosted Deploy",
                    cards: mapCards(["hoops-docker-standardization", "hoops-multi-stage-build", "hoops-github-actions-cicd", "hoops-self-hosted-deploy"])
                },
                {
                    title: "COST & INFRA OPTIMIZATION",
                    desc: "AWS network hardening / Redis strategy / monthly cost reduction",
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
