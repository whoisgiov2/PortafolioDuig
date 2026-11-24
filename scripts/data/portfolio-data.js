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
        id: 'PRJ-01',
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
        id: 'PRJ-02',
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
        id: 'PRJ-03',
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
        id: 'PRJ-04',
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

    // Reemplaza cada credentialUrl con el enlace individual de tu insignia/certificado
    certifications: [
      {
        title: 'Google Cybersecurity Professional',
        issuer: 'Google',
        focus: 'Operaciones SOC/SIEM, gestión de riesgos, Linux, SQL, Python y respuesta defensiva.',
        credentialUrl: 'https://www.coursera.org/verify/'
      },
      {
        title: 'Red Hat System Administration I (RH124)',
        issuer: 'Red Hat',
        focus: 'Administración esencial de RHEL: permisos, usuarios, servicios systemd, redes y almacenamiento.',
        credentialUrl: 'https://rhtapps.redhat.com/verify'
      },
      {
        title: 'Fortinet Certified Fundamentals',
        issuer: 'Fortinet',
        focus: 'Fundamentos de ciberseguridad, postura defensiva y arquitectura básica de protección.',
        credentialUrl: 'https://training.fortinet.com/'
      },
      {
        title: 'Technical Introduction to Cybersecurity 2.0',
        issuer: 'Fortinet',
        focus: 'Controles técnicos de seguridad perimetral, segmentación y mitigación de riesgos.',
        credentialUrl: 'https://training.fortinet.com/'
      },
      {
        title: 'Getting Started in Cybersecurity 3.0',
        issuer: 'Fortinet',
        focus: 'Principios esenciales de seguridad operativa, superficies de ataque y defensa inicial.',
        credentialUrl: 'https://training.fortinet.com/'
      },
      {
        title: 'Introduction to the Threat Landscape 3.0',
        issuer: 'Fortinet',
        focus: 'Taxonomía de amenazas modernas, tácticas de adversarios y priorización de controles.',
        credentialUrl: 'https://training.fortinet.com/'
      }
    ]
  };
})(window);
