const analyticsSession = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
    pageType: 'portfolio',
    pageStartedAt: Date.now(),
    visibleStartedAt: document.visibilityState === 'hidden' ? 0 : Date.now(),
    visibleDurationMs: 0,
    maxScrollPercent: 0,
    ended: false,
    currentSectionId: 'portfolio_page'
};

function pushDataLayerEvent(payload) {
    if (!payload || typeof payload !== 'object') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
}

function detectLinkType(href) {
    const target = String(href || '').trim().toLowerCase();
    if (!target) return 'unknown';
    if (target.startsWith('mailto:')) return 'mailto';
    if (target.startsWith('#')) return 'anchor';
    if (target.startsWith('http://') || target.startsWith('https://')) return 'external';
    return 'internal';
}

function inferDestinationPageType(destinationUrl) {
    const raw = String(destinationUrl || '').trim();
    if (!raw) return '';

    const linkType = detectLinkType(raw);
    if (linkType === 'anchor') return analyticsSession.pageType;
    if (linkType === 'mailto') return 'contact';
    if (linkType === 'external') return 'external';

    let parsedUrl;
    try {
        parsedUrl = new URL(raw, window.location.href);
    } catch {
        return analyticsSession.pageType;
    }

    const normalizedPath = String(parsedUrl.pathname || '').toLowerCase();
    if (!normalizedPath || normalizedPath === '/') return analyticsSession.pageType;
    if (
        normalizedPath === '/portfolio/' ||
        normalizedPath === '/portfolio/index.html' ||
        normalizedPath === '/portfolio'
    ) {
        return 'portfolio_hub';
    }
    if (normalizedPath.includes('-portfolio') || normalizedPath.includes('/docs/')) {
        return 'portfolio';
    }
    return analyticsSession.pageType;
}

function trackSelectContent({
    contentType,
    itemId,
    itemName,
    sectionName,
    interactionAction = 'click',
    elementType,
    elementLabel,
    linkUrl,
    linkType,
    modalName,
    value,
    sourceEvent = 'ui_click',
    ...extra
}) {
    const resolvedDestinationUrl = String(linkUrl || extra.destination_url || '').trim();
    const payload = {
        event: 'select_content',
        tracking_version: '2026-03-ga4-unified-v1',
        session_id: analyticsSession.id,
        page_path: window.location.pathname,
        page_title: document.title,
        page_type: analyticsSession.pageType,
        source_page_type: analyticsSession.pageType,
        content_type: contentType || 'unknown',
        item_id: itemId || 'unknown',
        section_name: sectionName || 'unknown',
        interaction_action: interactionAction,
        source_event: sourceEvent
    };

    if (itemName) payload.item_name = itemName;
    if (elementType) payload.element_type = elementType;
    if (elementLabel) payload.element_label = elementLabel;
    if (linkType) payload.link_type = linkType;
    if (resolvedDestinationUrl) {
        payload.link_url = resolvedDestinationUrl;
        if (!payload.link_type) {
            payload.link_type = detectLinkType(resolvedDestinationUrl);
        }
        payload.destination_url = resolvedDestinationUrl;
        payload.destination_page_type = inferDestinationPageType(resolvedDestinationUrl);
    }
    if (modalName) payload.modal_name = modalName;
    if (typeof value === 'number' && Number.isFinite(value) && value !== Infinity && value !== -Infinity) payload.value = value;

    Object.entries(extra).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
            payload[key] = val;
        }
    });

    pushDataLayerEvent(payload);
}

function readScrollPercent() {
    const documentElement = document.documentElement;
    const maxScrollable = Math.max(0, documentElement.scrollHeight - window.innerHeight);
    if (maxScrollable <= 0) return 100;
    const ratio = (window.scrollY / maxScrollable) * 100;
    return Math.max(0, Math.min(100, Math.round(ratio)));
}

function updateMaxScrollPercent() {
    analyticsSession.maxScrollPercent = Math.max(analyticsSession.maxScrollPercent, readScrollPercent());
}

function stopVisibleTimer(timestamp = Date.now()) {
    if (!analyticsSession.visibleStartedAt) return;
    analyticsSession.visibleDurationMs += Math.max(0, timestamp - analyticsSession.visibleStartedAt);
    analyticsSession.visibleStartedAt = 0;
}

function startVisibleTimer(timestamp = Date.now()) {
    if (document.visibilityState === 'hidden' || analyticsSession.visibleStartedAt) return;
    analyticsSession.visibleStartedAt = timestamp;
}

function endAnalyticsSession(reason = 'pagehide') {
    if (analyticsSession.ended) return;
    analyticsSession.ended = true;

    updateMaxScrollPercent();
    stopVisibleTimer();

    const totalDurationMs = Math.max(0, Date.now() - analyticsSession.pageStartedAt);
    const visibleDurationMs = Math.min(totalDurationMs, analyticsSession.visibleDurationMs);
    const hiddenDurationMs = Math.max(0, totalDurationMs - visibleDurationMs);

    trackSelectContent({
        contentType: 'page_engagement',
        itemId: 'portfolio_page',
        itemName: document.title || 'Portfolio',
        sectionName: 'lifecycle',
        interactionAction: 'end',
        elementType: 'page',
        elementLabel: 'PAGE_END',
        sourceEvent: 'lifecycle',
        duration_ms: totalDurationMs,
        engagement_time_msec: visibleDurationMs,
        hidden_duration_ms: hiddenDurationMs,
        max_scroll_percent: analyticsSession.maxScrollPercent,
        page_type: 'portfolio',
        end_reason: reason,
        value: Math.round(visibleDurationMs / 1000)
    });
}

function setupAnalyticsLifecycle() {
    updateMaxScrollPercent();

    trackSelectContent({
        contentType: 'page_engagement',
        itemId: 'portfolio_page',
        itemName: document.title || 'Portfolio',
        sectionName: 'lifecycle',
        interactionAction: 'start',
        elementType: 'page',
        elementLabel: 'PAGE_START',
        sourceEvent: 'lifecycle',
        page_type: 'portfolio'
    });

    window.addEventListener('scroll', updateMaxScrollPercent, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (analyticsSession.ended) return;

        if (document.visibilityState === 'hidden') {
            stopVisibleTimer();
            trackSelectContent({
                contentType: 'page_visibility',
                itemId: 'portfolio_page',
                itemName: document.title || 'Portfolio',
                sectionName: 'lifecycle',
                interactionAction: 'hidden',
                elementType: 'page',
                elementLabel: 'PAGE_HIDDEN',
                sourceEvent: 'lifecycle',
                page_type: 'portfolio'
            });
            return;
        }

        startVisibleTimer();
        trackSelectContent({
            contentType: 'page_visibility',
            itemId: 'portfolio_page',
            itemName: document.title || 'Portfolio',
            sectionName: 'lifecycle',
            interactionAction: 'visible',
            elementType: 'page',
            elementLabel: 'PAGE_VISIBLE',
            sourceEvent: 'lifecycle',
            page_type: 'portfolio'
        });
    });

    window.addEventListener('pagehide', () => endAnalyticsSession('pagehide'));
    window.addEventListener('beforeunload', () => endAnalyticsSession('beforeunload'));
}

document.addEventListener('DOMContentLoaded', () => {
    setupAnalyticsLifecycle();
});

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
import { templateConfig } from './config.js';

const baseMermaidConfig = {
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'linear'
    }
};

const mermaidConfig = {
    ...baseMermaidConfig,
    ...(templateConfig.mermaid ?? {}),
    flowchart: {
        ...baseMermaidConfig.flowchart,
        ...(templateConfig.mermaid?.flowchart ?? {})
    }
};

mermaid.initialize(mermaidConfig);

function byId(id) {
    return document.getElementById(id);
}

function normalizeHashTarget(target) {
    if (!target) return '#';
    return target.startsWith('#') ? target : `#${target}`;
}

function toSafeLabel(value) {
    return String(value ?? 'unknown').replace(/[^a-zA-Z0-9_-]+/g, ' ').trim() || 'unknown';
}

function setText(id, value) {
    const el = byId(id);
    if (el && value) el.textContent = value;
}

function setupUptime() {
    const uptimeElement = byId('uptime');
    if (!uptimeElement) return;
    const startTime = new Date();
    const updateUptime = () => {
        const now = new Date();
        const diff = Math.floor((now - startTime) / 1000);
        const h = Math.floor(diff / 3600).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        uptimeElement.textContent = `${h}:${m}:${s}`;
    };
    updateUptime();
    setInterval(updateUptime, 1000);
}

function setupMobileNav() {
    const nav = byId('header-nav');
    const toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;
    const closeNav = () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    const openNav = () => {
        nav.classList.add('is-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    };
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.contains('is-open') ? closeNav() : openNav();
    });
    nav.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement && (e.target.classList.contains('nav-item'))) closeNav();
    });
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
    });
}

function setSystemInfo() {
    if (templateConfig.system?.documentTitle) document.title = templateConfig.system.documentTitle;
    setText('system-name', templateConfig.system?.systemName);
}

function renderHero() {
    const hero = templateConfig.hero ?? {};
    const section = byId('system-architecture');
    const metrics = byId('hero-metrics');
    const mermaidContainer = byId('hero-mermaid');
    if (section && hero.sectionId) section.id = hero.sectionId;
    setText('hero-panel-title', hero.panelTitle);
    setText('hero-panel-uid', hero.panelUid);
    if (mermaidContainer && hero.diagramId) mermaidContainer.setAttribute('data-mermaid-id', hero.diagramId);
    if (!metrics) return;
    metrics.replaceChildren();
    renderMetricLines(metrics, hero.metrics, '> Add metrics in config');
}

function renderMetricLines(container, lines, fallback) {
    const items = Array.isArray(lines) ? lines : [];
    if (items.length === 0) {
        const p = document.createElement('p');
        p.textContent = fallback;
        container.appendChild(p);
        return;
    }
    items.forEach(line => {
        const p = document.createElement('p');
        p.textContent = `> ${String(line).replace(/^>\s*/, '')}`;
        container.appendChild(p);
    });
}

function createTopPanel(panel, index) {
    const section = document.createElement('section');
    section.className = `panel hero-panel ${panel.panelClass ?? ''}`.trim();
    section.id = panel.sectionId || `top-panel-${index + 1}`;
    const header = document.createElement('div');
    header.className = 'panel-header';
    const title = document.createElement('span');
    title.className = 'panel-title';
    title.textContent = panel.panelTitle || `TOP_PANEL_${index + 1}`;
    const uid = document.createElement('span');
    uid.className = 'panel-uid';
    uid.textContent = panel.panelUid || `ID: TOP-${String(index + 1).padStart(2, '0')}`;
    header.append(title, uid);
    const graphContainer = document.createElement('div');
    graphContainer.className = 'graph-container';
    const mermaidContainer = document.createElement('div');
    mermaidContainer.className = 'mermaid';
    mermaidContainer.setAttribute('data-mermaid-id', panel.diagramId || '');
    graphContainer.appendChild(mermaidContainer);
    const metrics = document.createElement('div');
    metrics.className = 'hero-message';
    renderMetricLines(metrics, panel.metrics, '> Add metrics');
    section.append(header, graphContainer, metrics);
    return section;
}

function renderTopPanels() {
    const container = byId('top-panels');
    if (!container) return;
    container.replaceChildren();
    const panels = Array.isArray(templateConfig.topPanels) ? templateConfig.topPanels : [];
    panels.forEach((p, i) => container.appendChild(createTopPanel(p, i)));
}

function renderSkills() {
    const config = templateConfig.skills ?? {};
    const grid = byId('skill-grid');
    if (!grid) return;
    setText('skills-panel-title', config.panelTitle);
    setText('skills-panel-uid', config.panelUid);
    grid.replaceChildren();
    (config.items ?? []).forEach(item => {
        const card = document.createElement('article');
        card.className = 'skill-card';
        const title = document.createElement('h3');
        title.className = 'skill-card-title';
        title.textContent = item.title ?? '';
        const stack = document.createElement('p');
        stack.className = 'skill-card-stack';
        stack.textContent = item.stack ?? '';
        card.append(title, stack);
        grid.appendChild(card);
    });
}

function createGroupDivider(group, theme) {
    const div = document.createElement('div');
    div.className = 'group-divider';
    div.setAttribute('data-theme', theme || 'blue');
    const title = document.createElement('span');
    title.className = 'group-title';
    title.textContent = group.title ?? '';
    const desc = document.createElement('span');
    desc.className = 'group-desc';
    desc.textContent = group.desc ?? '';
    div.append(title, desc);
    return div;
}

function createMetaLine(label, value) {
    if (!value) return null;
    const p = document.createElement('p');
    p.className = 'card-meta-line';
    const key = document.createElement('span');
    key.className = 'meta-label';
    key.textContent = `${label}:`;
    const val = document.createElement('span');
    val.className = 'meta-value';
    val.textContent = value;
    p.append(key, val);
    return p;
}

function createCardLinks(card) {
    const links = Array.isArray(card.links) ? card.links.filter(l => l?.href) : [];
    if (links.length === 0) return null;
    const wrapper = document.createElement('div');
    wrapper.className = 'card-links';
    links.forEach(item => {
        const link = document.createElement('a');
        link.className = 'card-link';
        const variant = String(item.variant ?? '').trim().toLowerCase();
        if (variant) link.classList.add(`is-${variant}`);
        link.href = item.href;
        link.textContent = item.label || 'LINK';
        if (!String(item.href).startsWith('mailto:')) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
        wrapper.appendChild(link);
    });
    return wrapper;
}

function createServiceCard(card, sectionConfig) {
    const article = document.createElement('article');
    article.className = `service-card ${sectionConfig.cardClass ?? ''} ${card.cardClass ?? ''}`.trim();
    if (card.mermaidId) article.id = card.mermaidId;
    const visual = document.createElement('div');
    visual.className = 'card-visual';
    const vHeight = card.visualHeight || sectionConfig.cardVisualHeight;
    if (vHeight) visual.style.setProperty('--card-visual-height', vHeight);
    const mermaidDiv = document.createElement('div');
    mermaidDiv.className = 'mermaid';
    mermaidDiv.setAttribute('data-mermaid-id', card.mermaidId ?? '');
    visual.appendChild(mermaidDiv);
    const content = document.createElement('div');
    content.className = 'card-content';
    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = card.title ?? '';
    const desc = document.createElement('p');
    desc.className = 'card-desc';
    desc.textContent = card.overview ?? card.description ?? '';
    content.append(title, desc);
    const role = createMetaLine('ROLE', card.role);
    if (role) content.append(role);
    const stack = createMetaLine('STACK', card.stackSummary);
    if (stack) content.append(stack);
    const links = createCardLinks(card);
    if (links) content.append(links);
    article.append(visual, content);
    return article;
}

let caseShowcaseControllers = [];

function createSectionRecruiterBrief(sectionConfig) {
    const brief = sectionConfig?.recruiterBrief;
    if (!brief) return null;
    const quickCases = (brief.cases || []).map(item => ({
        id: String(item?.id || '').trim(),
        anchorId: String(item?.anchorId || '').trim(),
        title: String(item?.title || '').trim(),
        problem: String(item?.problem || '').trim(),
        action: String(item?.action || '').trim(),
        impact: String(item?.impact || '').trim(),
        links: item?.links || []
    })).filter(i => i.id || i.title);

    const wrapper = document.createElement('section');
    wrapper.className = 'section-recruiter-brief';
    if (brief.kicker) {
        const kicker = document.createElement('p');
        kicker.className = 'section-recruiter-kicker';
        kicker.textContent = brief.kicker;
        wrapper.appendChild(kicker);
    }
    if (brief.title) {
        const title = document.createElement('h3');
        title.className = 'section-recruiter-title';
        title.textContent = brief.title;
        wrapper.appendChild(title);
    }

    if (quickCases.length > 0) {
        const grid = document.createElement('div');
        grid.className = 'section-recruiter-card-grid';
        quickCases.forEach(item => {
            const card = document.createElement('article');
            card.className = 'section-recruiter-card';
            const header = document.createElement('div');
            header.className = 'section-recruiter-card-header';
            const idLine = document.createElement('p');
            idLine.className = 'section-recruiter-card-id';
            idLine.textContent = item.id;
            const cardTitle = document.createElement('h4');
            cardTitle.className = 'section-recruiter-card-title';
            cardTitle.textContent = item.title;
            header.append(idLine, cardTitle);
            const toggleHint = document.createElement('div');
            toggleHint.className = 'section-recruiter-card-toggle-hint';
            toggleHint.textContent = 'DETAILS';
            header.appendChild(toggleHint);
            const details = document.createElement('div');
            details.className = 'section-recruiter-card-details';

            const createRow = (labelText, valueText) => {
                if (!valueText) return null;
                const row = document.createElement('div');
                row.className = 'section-recruiter-card-row';
                
                const key = document.createElement('span');
                key.className = 'section-recruiter-card-key';
                key.textContent = labelText;

                const val = document.createElement('span');
                val.className = 'section-recruiter-card-value';
                val.textContent = valueText;

                row.append(key, val);
                return row;
            };

            const problemRow = createRow('PROBLEM', item.problem);
            const actionRow = createRow('ACTION', item.action);
            const impactRow = createRow('IMPACT', item.impact);

            if (problemRow) details.appendChild(problemRow);
            if (actionRow) details.appendChild(actionRow);
            if (impactRow) details.appendChild(impactRow);

            // [추가] links 지원 (L_N 스타일 확장)
            if (Array.isArray(item.links)) {
                item.links.forEach(l => {
                    const btn = document.createElement('a');
                    btn.className = 'card-extra-btn';
                    btn.style.display = 'block';
                    btn.style.width = '100%';
                    btn.style.marginTop = '0.8rem';
                    btn.style.textAlign = 'center';
                    btn.href = l.href;
                    btn.textContent = l.label;
                    if (!String(l.href).startsWith('#')) {
                        btn.target = '_blank';
                        btn.rel = 'noopener noreferrer';
                    }
                    btn.onclick = (e) => {
                        if (String(l.href).startsWith('#')) {
                            e.preventDefault();
                            e.stopPropagation();
                            const hash = String(l.href);
                            revealHashTarget(hash);
                            
                            // GA4 Tracking
                            trackSelectContent({
                                contentType: 'recruiter_quick_brief_goto',
                                itemId: item.id || 'unknown_arch',
                                itemName: item.title || 'unknown_arch',
                                sectionName: 'recruiter_quick_brief',
                                interactionAction: 'click_goto_detail',
                                elementType: 'link',
                                elementLabel: l.label,
                                linkUrl: l.href
                            });
                        }
                    };
                    details.appendChild(btn);
                });
            }

            if (item.anchorId && item.anchorId !== '#') {
                const btn = document.createElement('button');
                btn.className = 'card-extra-btn';
                btn.style.width = '100%';
                btn.style.marginTop = '0.8rem';
                btn.textContent = '아키텍처 상세보기';
                btn.onclick = (e) => { 
                    e.stopPropagation(); 
                    revealHashTarget(item.anchorId); 
                    
                    // GA4 Tracking
                    trackSelectContent({
                        contentType: 'recruiter_quick_brief_goto',
                        itemId: item.id || 'unknown_arch',
                        itemName: item.title || 'unknown_arch',
                        sectionName: 'recruiter_quick_brief',
                        interactionAction: 'click_goto_detail',
                        elementType: 'button',
                        elementLabel: '아키텍처 상세보기',
                        linkUrl: `#${item.anchorId}`
                    });
                };
                details.appendChild(btn);
            }
            card.append(header, details);
            card.onclick = () => {
                const isExpanded = card.classList.toggle('is-expanded');
                
                // GA4 Tracking
                trackSelectContent({
                    contentType: 'recruiter_quick_brief_card',
                    itemId: item.id || 'unknown_arch',
                    itemName: item.title || 'unknown_arch',
                    sectionName: 'recruiter_quick_brief',
                    interactionAction: isExpanded ? 'expand' : 'collapse',
                    elementType: 'article',
                    elementLabel: item.id || 'unknown_arch'
                });
            };
            grid.appendChild(card);
        });
        wrapper.appendChild(grid);
    }
    const actions = document.createElement('div');
    actions.className = 'section-recruiter-actions';
    wrapper.appendChild(actions);
    return wrapper;
}

function ensureCaseCardVisible(targetId) {
    const id = targetId.replace(/^#/, '');
    let revealed = false;
    caseShowcaseControllers.forEach(c => { if (c.revealCase(id)) revealed = true; });
    return revealed;
}

function revealHashTarget(hash) {
    const id = hash.replace(/^#/, '');
    if (!id) return;
    ensureCaseCardVisible(id);
    setTimeout(() => {
        const target = byId(id);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('is-target-highlight');
        void target.offsetWidth;
        target.classList.add('is-target-highlight');
    }, 100);
}

function renderServiceSections() {
    const container = byId('service-sections');
    if (!container) return;
    container.replaceChildren();
    caseShowcaseControllers = [];
    (templateConfig.serviceSections || []).forEach(sec => {
        const wrapper = document.createElement('section');
        wrapper.className = 'service-section';
        wrapper.id = sec.id ?? '';
        const header = document.createElement('div');
        header.className = 'section-header';
        const h2 = document.createElement('h2');
        h2.className = 'section-title';
        h2.textContent = sec.title ?? '';
        header.appendChild(h2);
        const brief = createSectionRecruiterBrief(sec);
        const groupsContainer = document.createElement('div');
        groupsContainer.className = 'service-groups';
        const renderedCards = [];
        const groups = sec.groups || [{ cards: sec.cards || [] }];
        groups.forEach(g => {
            const gSec = document.createElement('div');
            gSec.className = 'service-group';
            if (g.title || g.desc) gSec.appendChild(createGroupDivider(g, sec.theme));
            const grid = document.createElement('div');
            grid.className = 'service-grid';
            (g.cards || []).forEach(c => {
                const el = createServiceCard(c, sec);
                grid.appendChild(el);
                renderedCards.push({ id: c.mermaidId || el.id, el });
            });
            gSec.appendChild(grid);
            groupsContainer.appendChild(gSec);
        });

        wrapper.append(header);
        if (brief) wrapper.appendChild(brief);
        wrapper.appendChild(groupsContainer);
        container.appendChild(wrapper);
    });
}

function renderContact() {
    const c = templateConfig.contact ?? {};
    const actions = byId('contact-actions');
    setText('contact-panel-title', c.panelTitle);
    setText('contact-panel-uid', c.panelUid);
    setText('contact-description', c.description);
    if (!actions) return;
    actions.replaceChildren();
    (c.actions || []).forEach(item => {
        const a = document.createElement('a');
        a.className = 'action-btn';
        a.href = item.href || '#';
        a.textContent = item.label || 'LINK';
        if (!String(item.href).startsWith('mailto:')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        actions.appendChild(a);
    });
}

function renderNavigation() {
    const nav = byId('header-nav');
    if (!nav) return;
    nav.replaceChildren();
    const items = templateConfig.navigation || [
        { label: 'ARCHITECTURE', target: '#system-architecture' },
        { label: 'SKILLS', target: '#skill-set' },
        { label: 'SERVICES', target: '#backend-services' },
        { label: 'CONTACT', target: '#contact' }
    ];
    items.forEach(item => {
        const a = document.createElement('a');
        a.className = 'nav-item';
        a.href = item.target;
        a.textContent = item.label;
        nav.appendChild(a);
    });
}

function setupScrollSpy() {
    const links = Array.from(document.querySelectorAll('.nav-item'));
    if (links.length === 0) return;
    window.addEventListener('scroll', () => {
        const headerHeight = document.querySelector('.status-bar')?.offsetHeight ?? 0;
        const baseline = window.scrollY + headerHeight + 50;
        let activeId = '';
        links.forEach(link => {
            const id = link.getAttribute('href').slice(1);
            const el = byId(id);
            if (el && el.offsetTop <= baseline) activeId = id;
        });
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href').slice(1) === activeId));
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    setSystemInfo();
    renderHero();
    renderTopPanels();
    renderSkills();
    renderServiceSections();
    renderContact();
    renderNavigation();
    setupUptime();
    setupMobileNav();
    const nodes = Array.from(document.querySelectorAll('.mermaid'));
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const mermaidId = node.getAttribute('data-mermaid-id');
        if (mermaidId && templateConfig.diagrams[mermaidId]) {
            node.innerHTML = templateConfig.diagrams[mermaidId];
            try {
                const tempClass = `mermaid-render-${i}`;
                node.classList.add(tempClass);
                await mermaid.run({ querySelector: `.${tempClass}` });
            } catch (e) {
                node.innerHTML = `<p style="color:#ffb4b4;">Render Error: ${mermaidId}</p>`;
            }
        }
    }
    setupMermaidModal();
    setupScrollSpy();
    if (window.location.hash) revealHashTarget(window.location.hash);
    window.onhashchange = () => revealHashTarget(window.location.hash);
});

function setupMermaidModal() {
    const modal = byId('mermaid-modal');
    const content = byId('mermaid-modal-content');
    const closeBtns = document.querySelectorAll('[data-mermaid-close]');
    if (!modal || !content) return;
    document.querySelectorAll('.mermaid').forEach(node => {
        node.style.cursor = 'zoom-in';
        node.onclick = () => {
            const svg = node.querySelector('svg');
            if (svg) {
                content.innerHTML = '';
                const clone = svg.cloneNode(true);
                clone.style.width = '100%';
                clone.style.height = 'auto';
                content.appendChild(clone);
                modal.classList.add('is-open');
                document.body.classList.add('modal-open');
            }
        };
    });
    closeBtns.forEach(b => b.onclick = () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
    });
}
