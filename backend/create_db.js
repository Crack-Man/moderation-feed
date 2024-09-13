const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

const bulletinsMockData = [
    {
        publishDate: 1672531200,
        publishDateString: '08:46, сегодня',
        ownerId: 101,
        ownerLogin: 'user101',
        bulletinSubject: 'Оператор на входящие звонки (Владивосток)',
        bulletinText: 'В связи с расширением отдела мы ищем сотрудника в нашу большую команду #ФАРПОСТВСЕСВОИ\n' +
            '\n' +
            'Если ты общительный и любознательный, мечтаешь построить карьеру, найти друзей и изменить мир к лучшему, то нам по пути.\n' +
            'Ты будешь:\n' +
            '- принимать входящие звонки от пользователей сайтов FarPost.ru, VL.ru, Drom.ru;\n' +
            '- помогать пользователям решать самые разные задачи и находить выход из нестандартных ситуаций.\n' +
            'Никаких продаж и «холодных» звонков!\n' +
            '\n' +
            'Юность и отсутствие опыта - не помеха. Наша команда и специалист по обучению помогут тебе стать крутым профи в общении с клиентами. Обучение будет состоять из нескольких этапов теории и практики. При этом ты будешь официально оформлен уже с первого рабочего дня.',
        bulletinImages: JSON.stringify([
            '/media/1.webp'
        ]),
    },
    {
        publishDate: 1672534800,
        publishDateString: '10:00, вчера',
        ownerId: 102,
        ownerLogin: 'user102',
        bulletinSubject: 'Вакансия: Backend разработчик',
        bulletinText: 'Требуется Backend разработчик с опытом работы с Node.js и базами данных. Работа удалённая, гибкий график.',
        bulletinImages: JSON.stringify([]),
    },
    {
        publishDate: 1672545600,
        publishDateString: '12:00, на прошлой неделе',
        ownerId: 103,
        ownerLogin: 'user103',
        bulletinSubject: 'Вакансия: Дизайнер UX/UI',
        bulletinText: 'Компания ищет UX/UI дизайнера для работы над веб-приложениями. Обязательно наличие портфолио.',
        bulletinImages: JSON.stringify([
            '/media/2.webp',
            '/media/3.jpg'
        ]),
    },
    {
        publishDate: 1672600000,
        publishDateString: '15:30, сегодня',
        ownerId: 104,
        ownerLogin: 'user104',
        bulletinSubject: 'Нужен DevOps инженер',
        bulletinText: 'В нашу команду требуется DevOps инженер с опытом работы в AWS и Docker. Обязателен опыт работы с CI/CD.',
        bulletinImages: JSON.stringify([
            '/media/1.webp',
        ]),
    },
    {
        publishDate: 1672611200,
        publishDateString: '18:00, сегодня',
        ownerId: 105,
        ownerLogin: 'user105',
        bulletinSubject: 'Требуется Frontend разработчик',
        bulletinText: 'Ищем опытного Frontend разработчика для работы над крупным проектом. Требования: опыт с React, знание JavaScript, CSS.',
        bulletinImages: JSON.stringify([
            '/media/1.webp',
            '/media/2.webp',
            '/media/3.jpg'
        ]),
    },
    {
        publishDate: 1672622400,
        publishDateString: '09:15, вчера',
        ownerId: 106,
        ownerLogin: 'user106',
        bulletinSubject: 'Требуется тестировщик',
        bulletinText: 'Ищем тестировщика ПО с опытом работы с автоматизированными тестами. Работа над крупными проектами в международной команде.',
        bulletinImages: JSON.stringify([
            '/media/2.webp',
        ])
    },
    {
        publishDate: 1672633600,
        publishDateString: '13:45, на прошлой неделе',
        ownerId: 107,
        ownerLogin: 'user107',
        bulletinSubject: 'Вакансия: Продуктовый менеджер',
        bulletinText: 'Ищем опытного продуктового менеджера для управления разработкой мобильного приложения. Обязателен опыт в agile.',
        bulletinImages: JSON.stringify([
            '/media/3.jpg'
        ])
    },
    {
        publishDate: 1672644800,
        publishDateString: '16:00, позавчера',
        ownerId: 108,
        ownerLogin: 'user108',
        bulletinSubject: 'Вакансия: Аналитик данных',
        bulletinText: 'Требуется аналитик данных с опытом работы с большими данными и машинным обучением. Приветствуется опыт с Python и SQL.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672656000,
        publishDateString: '11:30, сегодня',
        ownerId: 109,
        ownerLogin: 'user109',
        bulletinSubject: 'Требуется мобильный разработчик',
        bulletinText: 'Компания ищет мобильного разработчика с опытом работы с Flutter для разработки кросс-платформенных приложений.',
        bulletinImages: JSON.stringify([
            '/media/3.jpg'
        ])
    },
    {
        publishDate: 1672667200,
        publishDateString: '08:00, вчера',
        ownerId: 110,
        ownerLogin: 'user110',
        bulletinSubject: 'Ищем специалиста по кибербезопасности',
        bulletinText: 'Вакансия: специалист по кибербезопасности с опытом работы в области сетевой безопасности и защиты данных.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672700000,
        publishDateString: '09:00, сегодня',
        ownerId: 111,
        ownerLogin: 'user111',
        bulletinSubject: 'Требуется инженер по безопасности',
        bulletinText: 'Компания ищет инженера по безопасности с опытом работы с сетевой безопасностью и внедрением протоколов защиты.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672701200,
        publishDateString: '09:30, сегодня',
        ownerId: 112,
        ownerLogin: 'user112',
        bulletinSubject: 'Вакансия: Системный администратор',
        bulletinText: 'Ищем системного администратора для поддержки офисной инфраструктуры и удалённых серверов. Опыт с Linux обязателен.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672702400,
        publishDateString: '10:00, сегодня',
        ownerId: 113,
        ownerLogin: 'user113',
        bulletinSubject: 'Требуется Data Scientist',
        bulletinText: 'Вакансия для специалиста в области анализа данных с опытом работы в Python, SQL и статистических методах.',
        bulletinImages: JSON.stringify([
            '/media/3.jpg'
        ])
    },
    {
        publishDate: 1672703600,
        publishDateString: '10:30, сегодня',
        ownerId: 114,
        ownerLogin: 'user114',
        bulletinSubject: 'Ищем ML-инженера',
        bulletinText: 'Нужен ML-инженер для разработки моделей машинного обучения и их внедрения в рабочие процессы. Знание TensorFlow и PyTorch обязательно.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672704800,
        publishDateString: '11:00, сегодня',
        ownerId: 115,
        ownerLogin: 'user115',
        bulletinSubject: 'Вакансия: Специалист по тестированию',
        bulletinText: 'Ищем специалиста по тестированию для работы с web-приложениями. Требования: опыт работы с Selenium и написание автотестов.',
        bulletinImages: JSON.stringify([
            '/media/1.webp',
            '/media/2.webp',
        ])
    },
    {
        publishDate: 1672706000,
        publishDateString: '11:30, сегодня',
        ownerId: 116,
        ownerLogin: 'user116',
        bulletinSubject: 'Требуется HR-менеджер',
        bulletinText: 'Ищем опытного HR-менеджера для координации процесса найма и адаптации сотрудников. Опыт работы в IT-компаниях приветствуется.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672707200,
        publishDateString: '12:00, сегодня',
        ownerId: 117,
        ownerLogin: 'user117',
        bulletinSubject: 'Вакансия: Бизнес-аналитик',
        bulletinText: 'Ищем бизнес-аналитика для работы с клиентами и разработки требований для команд разработки. Опыт в IT обязателен.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672708400,
        publishDateString: '12:30, сегодня',
        ownerId: 118,
        ownerLogin: 'user118',
        bulletinSubject: 'Требуется IT-менеджер',
        bulletinText: 'В компанию требуется IT-менеджер для координации работы IT-отдела и взаимодействия с поставщиками. Опыт в управлении проектами обязателен.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672709600,
        publishDateString: '13:00, сегодня',
        ownerId: 119,
        ownerLogin: 'user119',
        bulletinSubject: 'Вакансия: Программист Python',
        bulletinText: 'Компания ищет программиста с опытом работы с Python для разработки веб-приложений и работы с базами данных.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672710800,
        publishDateString: '13:30, сегодня',
        ownerId: 120,
        ownerLogin: 'user120',
        bulletinSubject: 'Требуется Full Stack разработчик',
        bulletinText: 'Компания ищет Full Stack разработчика с опытом работы с React и Node.js для создания высоконагруженных приложений.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672722000,
        publishDateString: '15:00, сегодня',
        ownerId: 121,
        ownerLogin: 'user121',
        bulletinSubject: 'Вакансия: Архитектор ПО',
        bulletinText: 'Компания ищет архитектора программного обеспечения с опытом проектирования крупных распределённых систем. Необходимы знания в области микросервисной архитектуры и облачных решений.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672723200,
        publishDateString: '15:30, сегодня',
        ownerId: 122,
        ownerLogin: 'user122',
        bulletinSubject: 'Требуется маркетолог в IT-компанию',
        bulletinText: 'IT-компания ищет маркетолога с опытом в продвижении программного обеспечения и IT-услуг. Приветствуется знание цифрового маркетинга и аналитических инструментов.',
        bulletinImages: JSON.stringify([])
    },
    {
        publishDate: 1672724400,
        publishDateString: '16:00, сегодня',
        ownerId: 123,
        ownerLogin: 'user123',
        bulletinSubject: 'Вакансия: Контент-менеджер',
        bulletinText: 'Компания ищет контент-менеджера для ведения корпоративного блога, социальных сетей и разработки стратегии контент-маркетинга. Обязателен опыт работы в IT-сфере.',
        bulletinImages: JSON.stringify([])
    }
];

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS bulletins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        publishDate INTEGER NOT NULL,
        publishDateString TEXT NOT NULL,
        ownerId INTEGER NOT NULL,
        ownerLogin TEXT NOT NULL,
        bulletinSubject TEXT NOT NULL,
        bulletinText TEXT NOT NULL,
        bulletinImages JSON,
        decision TEXT,
        declineReason TEXT,
        escalateNote TEXT
    )`);

    const insertBulletins = (bulletin) => {
        db.run(`INSERT INTO bulletins (publishDate, publishDateString, ownerId, ownerLogin, bulletinSubject, bulletinText, bulletinImages)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                bulletin.publishDate,
                bulletin.publishDateString,
                bulletin.ownerId,
                bulletin.ownerLogin,
                bulletin.bulletinSubject,
                bulletin.bulletinText,
                bulletin.bulletinImages
            ],
            function(err) {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
    };
    bulletinsMockData.forEach(insertBulletins);
    console.log("Data created");
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Closed the database connection.');
});
