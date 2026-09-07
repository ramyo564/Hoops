import { diagrams } from './diagrams.js';

/**
 * Hoops Architecture Deep-Dive Configuration (DTO)
 * Awwwards-Standard Swiss Minimalist Specification
 */
export const portfolioConfig = {
    brand: 'YOHAN · HOOPS ARCHITECTURE',
    navLinks: [
        { label: 'Architecture Cases', href: '#cases' },
        { label: 'Problem Solving Portfolio ↗', href: 'https://ramyo564.github.io/Hoops-portfolio/', target: '_blank' },
        { label: 'GitHub ↗', href: 'https://github.com/ramyo564/Hoops', target: '_blank' },
        { label: 'Contact', href: 'mailto:yohan032yohan@gmail.com' }
    ],
    hero: {
        kicker: 'Hoops Engineering Architecture Deep-Dive',
        headline: 'SYSTEM ARCHITECTURE.<br>HIGH-CONCURRENCY PIPELINE.<br>INFRASTRUCTURE RESILIENCE.',
        description: 'Hoops 백엔드의 도메인 주도 계층형 모델(Layered Domain Model), WebSocket/SSE 실시간 통신 파이프라인, 그리고 AWS 인프라 및 Docker 멀티스테이지 CI/CD 자동화 구조를 기계적으로 분석한 엔지니어링 아키텍처 문서입니다.',
        killerMetrics: [
            { number: 'Multi-Channel', label: 'Realtime Pipeline', desc: 'WebSocket(STOMP) + SSE 알림' },
            { number: 'Zero-Touch', label: 'CI/CD Automation', desc: 'GitHub Actions & Self-hosted Runner' },
            { number: '80% CUT', label: 'AWS Cloud Cost', desc: 'ElastiCache → Container Redis 최적화' },
            { number: 'Clean Arch', label: 'Domain Separation', desc: 'Users/Game/Chat/Reports 8개 도메인 격리' }
        ]
    },
    sectionIntro: {
        tag: 'Architecture Blueprint',
        headline: '도메인 설계 및 시스템 아키텍처 명세',
        hint: '다이어그램을 클릭하면 고해상도 벡터 원본으로 확대 검증할 수 있습니다.'
    },
    cases: [
        {
            number: '01',
            category: 'DOMAIN ARCHITECTURE',
            period: '2024.04 – 2024.08',
            shortTitle: '도메인 계층 분리 및 패키지 구조',
            highlightMetric: '8개 도메인 패키지 분리',
            title: '도메인 주도 계층형 아키텍처 및 패키지 모델링',
            summary: 'users, game, chat, invite, friends, alarm, reports, manager 등으로 패키지를 엄격히 분리하여 응집도를 극대화하고 결합도를 낮춘 계층형(Controller-Service-Repository) 구조를 설계했습니다.',
            metrics: [
                { label: 'PACKAGE SEPARATION', value: '8개 핵심 도메인 독립 분리', highlight: true },
                { label: 'PATTERN', value: 'Layered Architecture (DIP/SRP 준수)' },
                { label: 'DATA PERSISTENCE', value: 'Spring Data JPA + MariaDB' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'Hoops 도메인 패키지 의존성 및 계층 구조',
                    mermaidId: 'hoops-domain-map'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Hoops',
            detailLinkLabel: '도메인 소스 코드 보기 (GitHub) ↗'
        },
        {
            number: '02',
            category: 'REALTIME MESSAGING',
            period: '2024.06',
            shortTitle: 'WebSocket + SSE 멀티채널',
            highlightMetric: '실시간 양방향 채팅 + 단방향 알림',
            title: 'WebSocket(STOMP) 및 SSE 멀티채널 실시간 통신 파이프라인',
            summary: '양방향 실시간 대화가 필요한 채팅에는 WebSocket(STOMP)을 적용하고, 관리자 신고 및 이벤트에는 단방향 SSE(Server-Sent Events) 파이프라인을 구축하여 네트워크 리소스를 최적화했습니다.',
            metrics: [
                { label: 'CHAT CHANNEL', value: 'WebSocket + STOMP (방별 목적지 격리)', highlight: true },
                { label: 'NOTIFICATION', value: 'Server-Sent Events (SSE) 실시간 파이프라인' },
                { label: 'BROKER CACHE', value: 'Redis 세션 및 캐시 연동' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '실시간 채팅 및 SSE 알림 브로커 파이프라인',
                    mermaidId: 'hoops-chat-realtime'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Hoops/tree/main/src/main/java/com/zerobase/hoops/chat',
            detailLinkLabel: '채팅 모듈 소스 코드 보기 ↗'
        },
        {
            number: '03',
            category: 'CONCURRENCY CONTROL',
            period: '2024.05',
            shortTitle: '매너점수 비관적 락 동시성 제어',
            highlightMetric: '데이터 레이스 컨디션 0건',
            title: '비관적 락(Pessimistic Lock) 기반 매너점수 동시성 제어',
            summary: '경기 종료 직후 다수의 참가자가 동시에 매너점수를 평가하는 환경에서 발생하는 레이스 컨디션 및 갱신 분실(Lost Update) 문제를 비관적 쓰기 락(PESSIMISTIC_WRITE)을 적용해 원천 해결했습니다.',
            metrics: [
                { label: 'RACE CONDITION', value: '발생 리스크 → 0건 (원자적 업데이트)', highlight: true },
                { label: 'LOCK STRATEGY', value: 'JPA Pessimistic Write Lock' },
                { label: 'INTEGRITY', value: '사전 검증 가드 + 트랜잭션 격리' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: '매너점수 동시성 제어 및 트랜잭션 락킹 흐름',
                    mermaidId: 'hoops-manner-concurrency'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Hoops/tree/main/src/main/java/com/zerobase/hoops/gameUsers',
            detailLinkLabel: '동시성 제어 소스 코드 보기 ↗'
        },
        {
            number: '04',
            category: 'SECURITY & GOVERNANCE',
            period: '2024.05',
            shortTitle: 'JWT + ChannelInterceptor 가드',
            highlightMetric: 'HTTP & WebSocket 통합 보안',
            title: 'JWT 토큰 게이트 및 WebSocket ChannelInterceptor 인가 체계',
            summary: '일반 HTTP API뿐만 아니라 WebSocket 연결 수립 및 STOMP 메시지 전송 시점에도 ChannelInterceptor를 통해 JWT 토큰 유효성과 게임 참가 권한을 실시간 검증하는 이중 보안 가드레일을 구축했습니다.',
            metrics: [
                { label: 'SECURITY COVERAGE', value: 'REST API + WebSocket 전 경로 인가', highlight: true },
                { label: 'OAUTH2', value: '카카오 소셜 로그인 연동' },
                { label: 'INTERCEPTOR', value: 'Spring Security + ChannelInterceptor' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'JWT 인증 필터 및 WebSocket 인터셉터 보안 흐름',
                    mermaidId: 'hoops-auth-security'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Hoops/tree/main/src/main/java/com/zerobase/hoops/security',
            detailLinkLabel: '보안 모듈 소스 코드 보기 ↗'
        },
        {
            number: '05',
            category: 'INFRASTRUCTURE & CLOUD',
            period: '2024.08',
            shortTitle: 'AWS 인프라 및 비용 80% 최적화',
            highlightMetric: '운영비 80% 절감 (Self-hosted & Docker)',
            title: 'AWS 클라우드 인프라 설계 및 컨테이너 전환 기반 비용 80% 절감',
            summary: 'Amazon Route53, ELB, EC2, RDS MariaDB 인프라를 구축하고, 고비용 ElastiCache를 EC2 내 Docker 컨테이너 Redis로 전환하여 안정성을 보장하면서 월 운영 비용을 80% 절감했습니다.',
            metrics: [
                { label: 'CLOUD COST', value: '월 운영 비용 약 80% 절감', highlight: true },
                { label: 'NETWORK', value: 'VPC 프라이빗 서브넷 DB 격리' },
                { label: 'CONTAINER', value: 'Docker Compose 기반 멀티 컨테이너 운용' }
            ],
            evidence: [
                {
                    tag: 'ARCHITECTURE',
                    title: 'AWS 클라우드 통합 인프라 및 네트워크 토폴로지',
                    mermaidId: 'hoops-system-overview'
                }
            ],
            detailLink: 'https://github.com/ramyo564/Hoops/blob/main/docker-compose.yml',
            detailLinkLabel: '인프라 설정 확인 (docker-compose.yml) ↗'
        }
    ],
    diagrams
};
