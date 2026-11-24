(function (global) {
  'use strict';

  const DraftPortfolio = (global.DraftPortfolio = global.DraftPortfolio || {});

  DraftPortfolio.DATA = {
    contactEmail: 'giovanni.reyesamed@gmail.com',
    githubUrl: 'https://github.com/whoisgiov2',
    cvUrl: 'assets/CV_Carlos_Giovanni_Reyes_Medina.pdf',
    cvDownloadName: 'CV_Carlos_Giovanni_Reyes_Medina.pdf',

    skills: [
      {
        icon: 'radar-soc',
        title: 'SOC / SIEM / EDR',
        description:
          'Monitoreo y detección de alertas, triaje inicial de eventos y análisis estructurado de riesgos operativos.',
        tags: ['SOC', 'SIEM', 'EDR', 'Análisis de Riesgos'],
        tagTone: 'sage'
      },
      {
        icon: 'shield-perimeter',
        title: 'Seguridad Perimetral',
        description:
          'Aplicación de controles perimetrales, políticas de firewall, túneles VPN y hardening básico de servicios.',
        tags: ['Firewalls', 'VPN', 'Hardening Básico'],
        tagTone: 'sage'
      },
      {
        icon: 'network-nodes',
        title: 'Redes & Segmentación',
        description:
          'Diseño de direccionamiento IP eficiente y segmentación lógica para aislar dominios de tráfico interno.',
        tags: ['Subnetting', 'VLSM', 'Routers', 'Switches'],
        tagTone: 'earth'
      },
      {
        icon: 'terminal-sys',
        title: 'Sistemas & Scripting',
        description:
          'Operación en Linux y Windows con automatización repetible de auditorías, conciliación e inspección.',
        tags: ['Linux (RH124)', 'Windows', 'Python', 'PowerShell', 'Bash'],
        tagTone: 'sage'
      },
      {
        icon: 'governance-iam',
        title: 'Gobierno de TI & Idiomas',
        description:
          'Trazabilidad de activos, evaluación formal de cambios RFC, mínimo privilegio y comunicación bilingüe.',
        tags: ['IAM / RFC', 'Español (Nativo)', 'Inglés (B2+)'],
        tagTone: 'earth'
      }
    ],

    projects: [
      {
        icon: 'audit-key',
        category: 'iam',
        categoryLabel: 'IAM & Gobierno',
        title: 'Auditoría IAM y Conciliación de Accesos con Python',
        problem:
          'Cuentas inactivas y permisos residuales que persisten tras procesos de desvinculación (offboarding), ampliando el riesgo de acceso indebido.',
        architecture:
          'Pipeline automatizado en Python para cruzar registros de bajas contra identidades activas y emitir reportes trazables para revocación.',
        tools: ['Python', 'Conciliación IAM', 'Post-Offboarding', 'Control de Accesos'],
        repoUrl: 'https://github.com/whoisgiov2'
      },
      {
        icon: 'rfc-layers',
        category: 'iam',
        categoryLabel: 'IAM & Gobierno',
        title: 'Gobierno de Activos, RFC y Migración Segura',
        problem:
          'Reducir la superficie de exposición tecnológica mediante trazabilidad real del inventario de TI y control riguroso sobre cambios.',
        architecture:
          'Normalización del inventario de activos, evaluación técnica de RFC por impacto y aplicación de mínimo privilegio hacia Microsoft Planner.',
        tools: ['Gobierno de Activos', 'Evaluación RFC', 'Mínimo Privilegio', 'Microsoft Planner'],
        repoUrl: 'https://github.com/whoisgiov2'
      },
      {
        icon: 'vpn-topology',
        category: 'redes',
        categoryLabel: 'Redes & Perímetro',
        title: 'Infraestructura y Seguridad Perimetral (Cisco Packet Tracer — UANL)',
        problem:
          'Aislar segmentos de red corporativa y asegurar comunicaciones entre sedes minimizando rutas de movimiento lateral.',
        architecture:
          'Topología multicapa con subnetting y VLSM, configuración de routers y switches, políticas de firewall por zona y túneles VPN site-to-site.',
        tools: ['Cisco Packet Tracer', 'Subnetting / VLSM', 'Firewalls', 'VPN Site-to-Site', 'Routers & Switches'],
        repoUrl: 'https://github.com/whoisgiov2'
      },
      {
        icon: 'forensic-pulse',
        category: 'defensa',
        categoryLabel: 'Seguridad Defensiva',
        title: 'Herramienta Forense y de Auditoría de Procesos',
        problem:
          'Obtener visibilidad temprana sobre procesos anómalos o ejecuciones sospechosas durante revisiones defensivas en endpoints.',
        architecture:
          'Scripts modulares multiplataforma para inspección en memoria y monitoreo de procesos activos, rutas binarias y árboles padre-hijo en Linux y Windows.',
        tools: ['Python', 'PowerShell', 'Bash', 'Inspección en Memoria', 'Linux & Windows'],
        repoUrl: 'https://github.com/whoisgiov2'
      }
    ],

    // Catálogo de certificaciones (las insignias con Credly incluyen su UUID y URL pública oficial)
    certifications: [
      {
        folio: '01',
        title: 'Red Hat System Administration I (RH124 - RHA) - Ver. 9.3',
        issuer: 'Red Hat',
        issuerIcon: 'issuer-redhat',
        badgeImage: 'assets/blob.png',
        badgeType: 'Learning · Credly',
        platform: 'Credly · Red Hat Academy',
        domain: 'Linux RHEL 9.3',
        badgeId: '3fc123bb-1f03-4f52-be7e-37236039fb44',
        focus: 'Administración esencial de RHEL 9.3: línea de comandos, usuarios, permisos, systemd, OpenSSH y paquetes DNF/RPM.',
        criteria:
          'Acredita la finalización oficial del curso Red Hat System Administration I (RH124 v9.3) en Red Hat Academy, cubriendo administración de archivos, control de accesos, procesos, servicios systemd, redes básicas y seguridad con OpenSSH.',
        skills: ['Linux', 'RHEL 9.3', 'Permisos & Usuarios', 'Systemd', 'OpenSSH', 'RHCSA Base'],
        credentialUrl: 'https://www.credly.com/badges/3fc123bb-1f03-4f52-be7e-37236039fb44/public_url'
      },
      {
        folio: '02',
        title: 'Fortinet Certified Fundamentals Cybersecurity',
        issuer: 'Fortinet',
        issuerIcon: 'issuer-fortinet',
        badgeImage: 'assets/funcyb.png',
        badgeType: 'Certificación · Credly',
        platform: 'Credly · Fortinet Training',
        domain: 'Fundamentos Defensivos',
        badgeId: 'a74b8068-587b-4bf0-b551-a88bd64a80be',
        focus: 'Certificación fundacional en ciberseguridad, postura defensiva, controles de red, endpoints y privacidad.',
        criteria:
          'Valida el dominio de habilidades técnicas y conceptos esenciales de ciberseguridad exigidos para roles iniciales, completando el núcleo de panorama de amenazas y formación técnica de Fortinet.',
        skills: ['Cybersecurity', 'Endpoint Security', 'Application Security', 'Cloud Services', 'Cryptography', 'Data Privacy'],
        credentialUrl: 'https://www.credly.com/badges/a74b8068-587b-4bf0-b551-a88bd64a80be/public_url'
      },
      {
        folio: '03',
        title: 'Google Cybersecurity Professional',
        issuer: 'Google',
        issuerIcon: 'issuer-google',
        badgeImage: null,
        badgeType: 'Certificado Profesional',
        platform: 'Google · Coursera',
        domain: 'SOC / SIEM / Python',
        badgeId: 'GOOGLE-CYBER-PRO',
        focus: 'Operaciones SOC/SIEM, gestión de riesgos, Linux, SQL, automatización en Python y respuesta defensiva.',
        criteria:
          'Programa profesional integral orientado a operaciones de seguridad defensiva, detección y triaje de alertas en SIEM, análisis de riesgos, Linux, SQL y automatización de auditorías en Python.',
        skills: ['SOC / SIEM', 'Gestión de Riesgos', 'Python', 'Linux & SQL', 'Detección de Alertas'],
        credentialUrl: 'https://www.coursera.org/verify/'
      },
      {
        folio: '04',
        title: 'Fortinet NSE 1 Certified in Cybersecurity',
        issuer: 'Fortinet',
        issuerIcon: 'issuer-fortinet',
        badgeImage: 'assets/NSE1.png',
        badgeType: 'NSE 1 · Credly',
        platform: 'Credly · Fortinet NSE',
        domain: 'Concientización & Amenazas',
        badgeId: '237cb830-a29d-4f9e-bf54-239e6d8a5afe',
        focus: 'Identificación de amenazas digitales, vectores de ataque comunes y principios de protección organizacional.',
        criteria:
          'Certifica comprensión estructurada del panorama de amenazas cibernéticas, tipologías de adversarios, vectores de compromiso y prácticas de prevención en entornos corporativos.',
        skills: ['Cybersecurity Fundamentals', 'Threat Awareness', 'Information Security', 'Risk Prevention'],
        credentialUrl: 'https://www.credly.com/badges/237cb830-a29d-4f9e-bf54-239e6d8a5afe/public_url'
      },
      {
        folio: '05',
        title: 'Fortinet NSE 2 Certified in Cybersecurity',
        issuer: 'Fortinet',
        issuerIcon: 'issuer-fortinet',
        badgeImage: 'assets/NSE2.png',
        badgeType: 'NSE 2 · Credly',
        platform: 'Credly · Fortinet NSE',
        domain: 'Arquitectura & Perímetro',
        badgeId: 'c2987319-0a45-4cc8-8f7c-002b768c699c',
        focus: 'Evolución de controles de seguridad de red, protección perimetral, segmentación y soluciones defensivas.',
        criteria:
          'Acredita el conocimiento de arquitecturas y tecnologías de seguridad diseñadas para mitigar amenazas en red, endpoints, nube y perímetro corporativo.',
        skills: ['Network Security', 'Firewalling', 'Endpoint Protection', 'Security Architecture'],
        credentialUrl: 'https://www.credly.com/badges/c2987319-0a45-4cc8-8f7c-002b768c699c/public_url'
      },
      {
        folio: '06',
        title: 'Getting Started in Cybersecurity 3.0',
        issuer: 'Fortinet',
        issuerIcon: 'issuer-fortinet',
        badgeImage: 'assets/STR3.png',
        badgeType: 'Curso 3.0 · Credly',
        platform: 'Credly · Fortinet Training',
        domain: 'Seguridad Operativa',
        badgeId: 'e1a73752-3840-4d73-b278-a6eac8b7cbc3',
        focus: 'Principios esenciales de seguridad operativa, tecnologías clave de protección y defensa en endpoints y nube.',
        criteria:
          'Acredita conocimientos base sobre terminología técnica, arquitecturas de protección, servicios en la nube, defensa de endpoints y controles fundamentales de ciberseguridad.',
        skills: ['Cybersecurity Concepts', 'Cloud Services', 'Endpoint Security', 'Defensive Controls'],
        credentialUrl: 'https://www.credly.com/badges/e1a73752-3840-4d73-b278-a6eac8b7cbc3/public_url'
      },
      {
        folio: '07',
        title: 'Introduction to the Threat Landscape 3.0',
        issuer: 'Fortinet',
        issuerIcon: 'issuer-fortinet',
        badgeImage: 'assets/THL3.png',
        badgeType: 'Amenazas 3.0 · Credly',
        platform: 'Credly · Fortinet Training',
        domain: 'Threat Landscape',
        badgeId: '9ecd5d53-b75f-41d7-aa81-3355bc49a64b',
        focus: 'Taxonomía de amenazas modernas, malware, ingeniería social y principios de defensa de redes y usuarios.',
        criteria:
          'Valida la capacidad para reconocer actores de amenaza, campañas de malware, técnicas de ingeniería social y principios fundamentales para resguardar redes y usuarios.',
        skills: ['Threat Intelligence', 'Malware Attacks', 'Social Engineering', 'Security Principles'],
        credentialUrl: 'https://www.credly.com/badges/9ecd5d53-b75f-41d7-aa81-3355bc49a64b/public_url'
      },
      {
        folio: '08',
        title: 'Technical Introduction to Cybersecurity 2.0',
        issuer: 'Fortinet',
        issuerIcon: 'issuer-fortinet',
        badgeImage: 'assets/TECINCY2.png',
        badgeType: 'Técnico 2.0 · Credly',
        platform: 'Credly · Fortinet Training',
        domain: 'Controles Técnicos',
        badgeId: '1697c3a4-ca5d-481d-b079-ff4ff5031960',
        focus: 'Fundamentos técnicos de seguridad de red, autenticación, seguridad de aplicaciones y defensa perimetral.',
        criteria:
          'Acredita comprensión técnica de los mecanismos de protección de redes, controles de autenticación e identidad, protección de aplicaciones y seguridad de endpoints.',
        skills: ['Network Security', 'Authentication Controls', 'Application Security', 'Endpoint Security'],
        credentialUrl: 'https://www.credly.com/badges/1697c3a4-ca5d-481d-b079-ff4ff5031960/public_url'
      }
    ]
  };
})(window);
