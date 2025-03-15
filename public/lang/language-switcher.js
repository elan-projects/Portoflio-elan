document.addEventListener('DOMContentLoaded', function() {
    const elementsToSwitch = document.querySelectorAll('[data-key]');
    const translations = {
        "ar": {
            "home": "الرئيسية",
            "service": "خدماتنا",
            "project": "مشاريعنا",
            "contact": "تواصل معنا",
            "projects": "أعمالنا",
            "service_text": "نحو مستقبل رقمي مبتكر! نحن نساعد الشركات على تحويل الأفكار إلى تجارب رقمية استثنائية.",
            "web_dev_intro": "تطوير الويب",
            "web_dev_text_service": "نصمم ونطور مواقع ويب احترافية تعكس هوية علامتك التجارية وتعزز وجودك الرقمي.",
            "seo_intro": "التسويق الرقمي",
            "seo_text_service": "تحسين تجربة المستخدم، تعزيز سرعة الموقع، ورفع ترتيبه في محركات البحث لتحقيق المزيد من التحويلات.",
            "mobile_intro": "تطبيقات الهاتف",
            "mobile_text_service": "نبتكر تطبيقات مخصصة وسهلة الاستخدام تساعد في توسيع نطاق أعمالك والوصول إلى جمهورك بسهولة.",
            "testi_text": "عملاؤنا يثقون بنا لإنشاء حلول رقمية فعالة تحقق النجاح وتدعم النمو المستدام.",
            "selected_project_text": "استكشف مشاريعنا المتميزة التي تجمع بين الإبداع والابتكار لتحقيق أفضل النتائج.",
            "add_yours": "شارك رأيك",
            "name": "الاسم الكامل",
            "profession": "المهنة",
            "your_message": "رسالتك",
            "choose_img": "اختر صورة",
            "submit_button": "إرسال",
            "meet_devs": "تعرف على المبدعين خلف مواقعك المستقبلية",
            "more_info_text": "نحن هنا لمساعدتك على بناء استراتيجيتك الرقمية، سواء كنت شركة ناشئة أو مؤسسة رائدة.",
            "your_email_input": "أدخل بريدك الإلكتروني",
            "get_started_button": "ابدأ الآن",
            "elan_strong": "Elan - حيث يندمج الإبداع مع التكنولوجيا لنصنع لك حضورًا رقميًا استثنائيًا!",
            "contact_us": "اتصل بنا",
            "navigation": "التنقل",
            "follow_us": "تابعنا",
            "digital_success": "رحلتك نحو <br> النجاح الرقمي <span>تبدأ هنا</span>",
            "brand_elevation": "مواقع ويب عالية الجودة <span>تعزز علامتك التجارية</span> وتحقق <span>نتائج ملموسة</span>. لنبنِ شيئًا رائعًا معًا!",
            "our_services": "ما الذي <span>نقدمه؟</span>",
            "selected_projects": "أبرز <span>مشاريعنا</span>",
            "meet_developers": "قابل <span>المطورين</span>",
            "our_happy_clients": "آراء <span>عملائنا</span>",
            "selected_projects_text": "شاهد أعمالنا المتميزة التي تعكس خبرتنا في بناء مواقع احترافية تحقق أهداف عملك وتعزز حضورك الرقمي.",
            "contact_us_text": "هل لديك استفسار أو فكرة مشروع؟ لا تتردد في التواصل معنا، نحن هنا لتحويل رؤيتك إلى موقع إلكتروني احترافي يزيد من نجاحك!",
            "form_name": "اسمك",
            "form_email": "بريدك الإلكتروني",
            "form_subject": "موضوع الرسالة",
            "form_message": "اكتب رسالتك هنا",
            "form_submit": "أرسل الآن",
            "view_more": "اكتشف المزيد",
            "ready_to_elevate": "هل أنت مستعد <span>للانطلاق؟</span>"
        },
        "zh": {
            "home": "首页",
            "service": "服务",
            "project": "项目",
            "contact": "联系",
            "projects": "项目",
            "service_text": "帮助各类企业将创意变成强大的数字体验。让我们实现您的愿景！",
            "web_dev_intro": "网页开发",
            "web_dev_text_service": "打造视觉惊艳且用户友好的网站，吸引受众并提升互动。",
            "seo_intro": "数字营销",
            "seo_text_service": "优化您的网站，提高速度、SEO和用户体验，以增强可见性和转化率。",
            "mobile_intro": "移动应用开发",
            "mobile_text_service": "设计和开发定制移动应用程序，拓展您的品牌影响力。",
            "testi_text": "来自各行各业的企业信任我们，提供定制化解决方案，并建立成功的长期合作伙伴关系。",
            "selected_project_text": "探索我们最出色的作品，以精确、创新和成果为核心打造。",
            "add_yours": "添加您的评价",
            "name": "全名",
            "profession": "职业",
            "your_message": "您的留言",
            "choose_img": "选择图片",
            "submit_button": "提交",
            "meet_devs": "认识我们的开发人员",
            "more_info_text": "无论您是成长中的初创公司还是成熟的企业，我们的专业团队都能帮助您优化在线战略，实现可衡量的成功。",
            "your_email_input": "您的电子邮件",
            "get_started_button": "开始",
            "elan_strong": "Elan – 在这里，创新设计与用户至上的解决方案相结合，提升您的在线影响力。",
            "contact_us": "联系我们",
            "navigation": "导航",
            "follow_us": "关注我们",
            "digital_success": "您的数字 <br>成功<span>从这里开始</span>",
            "brand_elevation": "令人惊叹的高性能网站，<span>提升您的品牌</span>并<span>推动成果</span>。让我们一起打造非凡的东西！",
            "our_services": "我们的<span>服务</span>",
            "selected_projects": "精选<span>项目</span>",
            "meet_developers": "认识<span>开发者</span>",
            "our_happy_clients": "我们的<span>满意客户</span>",
            "selected_projects": "精选 <span>项目</span>",
            "selected_projects_text": "探索我们精心挑选的项目，每一个都体现了我们的热情和奉献精神。",
            "home": "首页",
            "contact_us": "联系我们",
            "contact_us_text": "我们很乐意听取您的意见！无论您有问题、需要帮助，还是想讨论项目，请随时联系我们。我们的团队将帮助您将想法变为现实，并提升您的数字影响力。",
            "form_name": "姓名",
            "form_email": "电子邮件",
            "form_subject": "主题",
            "form_message": "信息",
            "form_submit": "提交",
            "view_more": "查看更多",
            "ready_to_elevate": "准备提升您的<span>数字存在了吗？</span>"

        },
        "en": {
            "home": "Home",
            "service": "Service",
            "project": "Project",
            "contact": "Contact",
            "projects": "Projects",
            "service_text": "Helping businesses of all sizes turn ideas into powerful digital experiences. Let's bring your vision to life!",
            "web_dev_intro": "Web Development",
            "web_dev_text_service": "Crafting visually stunning and user-friendly websites that captivate your audience and drive engagement.",
            "seo_intro": "Digital Marketing",
            "seo_text_service": "Optimizing your website for speed, SEO, and user experience to enhance visibility and drive conversions.",
            "mobile_intro": "Mobile App Development",
            "mobile_text_service": "Designing and developing customized mobile applications to expand your brand's reach.",
            "testi_text": "Businesses from various industries trust us for custom solutions and lasting partnerships built on success.",
            "selected_project_text": "Discover our finest work, crafted with precision, innovation, and a focus on results.",
            "add_yours": "Add Yours",
            "name": "Full Name",
            "profession": "Profession",
            "your_message": "Your Message",
            "choose_img": "Choose Image",
            "submit_button": "Submit",
            "meet_devs": "Meet the Developers",
            "more_info_text": "Whether you're a growing startup or an established business, our expert team is here to help you transform your online strategy and achieve measurable success.",
            "your_email_input": "Your email",
            "get_started_button": "Get Started",
            "elan_strong": "Elan – Where innovative design meets user-focused solutions to elevate your online presence.",
            "contact_us": "Contact Info",
            "navigation": "Navigation",
            "follow_us": "Follow Us",
            "digital_success": "Your Digital <br>Success <span>Starts Here</span>",
            "brand_elevation": "Stunning, high-performance websites that <span>elevate your brand</span> and <span>drive results</span>. Let's build something amazing together!",
            "our_services": "Our <span>Services</span>",
            "selected_projects": "Selected <span>Projects</span>",
            "meet_developers": "Meet the <span>Developers</span>",
            "our_happy_clients": "Our <span>Happy Clients</span>",
            "selected_projects": "Selected <span>Projects</span>",
            "selected_projects_text": "Explore our handpicked projects, each a testament to our passion and dedication.",
            "home": "Home",
            "contact_us": "Contact Us",
            "contact_us_text": "We’d love to hear from you! Whether you have a question, need assistance, or want to discuss a project, feel free to reach out. Our team is here to help bring your ideas to life and elevate your digital presence.",
            "form_name": "Name",
            "form_email": "Email",
            "form_subject": "Subject",
            "form_message": "Message",
            "form_submit": "Submit",
            "view_more": "View more",
            "ready_to_elevate": "Ready to Elevate Your <span>Digital Presence?</span>"
        },

        "fr": {
            "home": "Accueil",
            "service": "Service",
            "project": "Projet",
            "contact": "Contact",
            "projects": "Projets",
            "service_text": "Aider les entreprises de toutes tailles à transformer leurs idées en expériences numériques puissantes. Donnons vie à votre vision !",
            "web_dev_intro": "Développement Web",
            "web_dev_text_service": "Création de sites web visuellement époustouflants et conviviaux qui captivent votre audience et stimulent l'engagement.",
            "seo_intro": "Marketing Digital",
            "seo_text_service": "Optimisation de votre site web pour la vitesse, le référencement et l'expérience utilisateur afin d'améliorer la visibilité et d'augmenter les conversions.",
            "mobile_intro": "Développement d'Applications Mobiles",
            "mobile_text_service": "Conception et développement d'applications mobiles personnalisées pour étendre la portée de votre marque.",
            "testi_text": "Des entreprises de divers secteurs nous font confiance pour des solutions sur mesure et des partenariats durables basés sur le succès.",
            "selected_project_text": "Découvrez nos meilleurs travaux, réalisés avec précision, innovation et un focus sur les résultats.",
            "add_yours": "Ajouter le vôtre",
            "name": "Nom complet",
            "profession": "Profession",
            "your_message": "Votre message",
            "choose_img": "Choisir une image",
            "submit_button": "Soumettre",
            "meet_devs": "Rencontrez les développeurs",
            "more_info_text": "Que vous soyez une start-up en croissance ou une entreprise établie, notre équipe d'experts est là pour vous aider à transformer votre stratégie en ligne et à atteindre un succès mesurable.",
            "your_email_input": "Votre email",
            "get_started_button": "Commencer",
            "elan_strong": "Elan – Où le design innovant rencontre des solutions centrées sur l'utilisateur pour élever votre présence en ligne.",
            "contact_us": "Nous contacter",
            "navigation": "Navigation",
            "follow_us": "Suivez-nous",
            "digital_success": "Votre succès <br>numérique <span>commence ici</span>",
            "brand_elevation": "Des sites web époustouflants et performants qui <span>élèvent votre marque</span> et <span>génèrent des résultats</span>. Construisons quelque chose d'extraordinaire ensemble !",
            "our_services": "Nos <span>services</span>",
            "selected_projects": "Projets <span>sélectionnés</span>",
            "meet_developers": "Rencontrez les <span>développeurs</span>",
            "our_happy_clients": "Nos <span>clients satisfaits</span>",
            "selected_projects_text": "Explorez nos projets soigneusement sélectionnés, chacun témoignant de notre passion et de notre dévouement.",
            "contact_us_text": "Nous serions ravis d'avoir de vos nouvelles ! Que vous ayez une question, besoin d'assistance ou que vous souhaitiez discuter d'un projet, n'hésitez pas à nous contacter. Notre équipe est là pour vous aider à donner vie à vos idées et à élever votre présence numérique.",
            "form_name": "Nom",
            "form_email": "Email",
            "form_subject": "Sujet",
            "form_message": "Message",
            "form_submit": "Soumettre",
            "view_more": "Voir plus",
            "ready_to_elevate": "Prêt à élever votre <span>présence numérique ?</span>"
        }
    }




    function setLanguagePreference(language) {
        try {
            sessionStorage.setItem('selectedLanguage', language);
        } catch (error) {
            console.error('Failed to save language preference:', error);
        }
    }

    function getLanguagePreference() {
        try {
            const language = sessionStorage.getItem('selectedLanguage');
            return language || 'ar';
        } catch (error) {
            console.error('Failed to retrieve language preference:', error);
            return 'en';
        }
    }

    function switchLanguage(language) {
        elementsToSwitch.forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = translations[language]?.[key] || translations['en'][key] || `[${key}]`;

            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = translation;
            } else {
                element.innerHTML = translation;
            }
        });

        changeDirectionAndFont(language);

        setLanguagePreference(language);
    }

    function changeDirectionAndFont(language) {
        const containers = [
            'footer_section',
            'service_card',
            'nav__links_sec',
            'contact_info_section',
            'testi_form',
            'service_cards_wrapper',
            'main_content'

        ];

        containers.forEach(className => {
            const container = document.querySelectorAll(`.${className}`);
            container.forEach(item => {
                if (language === 'ar') {
                    item.style.direction = "rtl";
                } else {
                    item.style.direction = "ltr";
                }
            });
        });

        if (language === 'ar') {
            document.body.style.fontFamily = '"Noto Kufi Arabic", serif';

            document.querySelectorAll("button, .nav__links_sec li, h1, form input, form textarea , .email_input input").forEach(element => {
                element.style.fontFamily = '"Noto Kufi Arabic", serif';
            });

            document.querySelectorAll(".main_content h1").forEach(item => {
                item.style.fontSize = "2.5rem"; // Ensure correct Arabic font size
                console.log("done");
            });

        } else {
            document.body.style.fontFamily = '"Source Sans 3", serif';

            document.querySelectorAll("button, .nav__links_sec li, h1, form input, form textarea , .email_input input").forEach(element => {
                element.style.fontFamily = '"Source Sans 3", serif';
            });
        }


        document.querySelectorAll(".rate_num").forEach(rate => {
            rate.style.direction = language === 'ar' ? 'rtl' : 'ltr';
        });
    }

    const savedLanguage = getLanguagePreference();
    switchLanguage(savedLanguage);

    function languageSelects() {
        const languageSelect = document.getElementById('language-select');
        if (!languageSelect) {
            return;
        }
        languageSelect.addEventListener('change', function() {
            const selectedOption = languageSelect.options[languageSelect.selectedIndex];
            const selectedLang = selectedOption.getAttribute('data-lang');
            switchLanguage(selectedLang);
        });
    }
    languageSelects()
}, 100);