/**
 * ============================================================
 *  catalogo.js — Base de datos de títulos
 * ============================================================
 *  Agrega, edita o elimina entradas aquí sin tocar el buscador.
 *
 *  Estructura de cada entrada:
 *  {
 *    id        : número único,
 *    titulo    : "Nombre del título",
 *    tipo      : "manga" | "anime" | "manhwa" | "donghua",
 *    generos   : ["genero1", "genero2", ...],
 *    temporadas: número,
 *    cover     : "emoji"  ← o ruta/URL de imagen,
 *    sinopsis  : "Texto de descripción.",
 *
 *    -- URLs por formato (pon solo las que tenga el título) --
 *    urlAnime  : "https://...",   ← botón rojo    "Ver Anime"
 *    urlManga  : "https://...",   ← botón púrpura "Ver Manga"
 *    urlManhwa : "https://...",   ← botón cian    "Ver Manhwa"
 *    urlDonghua: "https://...",   ← botón verde   "Ver Donghua"
 *    url       : "https://...",   ← botón genérico (solo si no hay ninguno arriba)
 *  }
 *
 *  Géneros disponibles (puedes añadir los que necesites):
 *  accion · romance · fantasia · terror · comedia ·
 *  sci-fi · drama · sobrenatural · historia
 * ============================================================
 */

export const CATALOG = [ 
  {
    id: 1, titulo: "Boku no Kokoro no Yaiba Yatsu", tipo: ["manga", "anime"],
    generos: ["romance","comedia","escolar","anime"], temporadas: 2, cover: "001.jpeg",
    sinopsis: "Kyotaro Ichikawa es un chico solitario que fantasea con asesinar a la chica popular de la clase, pero pronto descubre que sus sentimientos son muy diferentes.",
    urlManga: "https://tu-sitio.com/boku-no-kokoro-manga",
    urlAnime: "https://tu-sitio.com/boku-no-kokoro-anime"
  },
  {
    id: 2, titulo: "Kimi ni Todoke", tipo: ["manga", "anime"],
    generos: ["romance","drama","escolar","anime"], temporadas: 3, cover: "002.jpeg",
    sinopsis: "Sawako, apodada 'Sadako' por su parecido con la niña de El Aro, intenta hacer amigos y encuentra el amor en el chico más popular de la escuela.",
    urlManga: "https://tu-sitio.com/kimi-ni-todoke-manga",
    urlAnime: "https://tu-sitio.com/kimi-ni-todoke-anime"
  },
  {
    id: 3, titulo: "See You in My 19th Life", tipo: "manhwa",
    generos: ["romance","drama","sobrenatural"], cover: "003.jpeg",
    sinopsis: "Ban Ji-eum puede recordar todas sus vidas pasadas. Tras morir trágicamente en su vida 18, dedica la 19 a reencontrarse con su amor de la infancia.",
    urlManhwa: "https://tu-sitio.com/19th-life-manhwa"
  },
  {
    id: 4, titulo: "Cinderella Chef", tipo: "donghua",
    generos: ["romance","comedia","historico","anime"], temporadas: 3, cover: "004.jpeg",
    sinopsis: "Una joven chef viaja en el tiempo a la antigua China. Es secuestrada por bandidos y debe usar su ingenio y cocina para conquistar el corazón de su captor.",
    urlDonghua: "https://tu-sitio.com/cinderella-chef"
  },
  {
    id: 5, titulo: "Sono Bisque Doll", tipo: ["manga", "anime"],
    generos: ["romance","comedia","recuentos de la vida","anime"], temporadas: 1, cover: "005.jpeg",
    sinopsis: "Wakana Gojo, un chico tímido que hace muñecas Hina, termina ayudando a la hermosa Marin Kitagawa a cumplir su sueño de hacer cosplay.",
    urlManga: "https://tu-sitio.com/bisque-doll-manga",
    urlAnime: "https://tu-sitio.com/bisque-doll-anime"
  },
  {
    id: 6, titulo: "Giji Harem", tipo: ["manga", "anime"],
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "006.jpeg",
    sinopsis: "Nijakura es una chica del club de teatro que usa sus dotes de actuación para interpretar diferentes personalidades y darle a su senpai un 'harem'.",
    urlManga: "https://tu-sitio.com/pseudo-harem-manga",
    urlAnime: "https://tu-sitio.com/pseudo-harem-anime"
  },
  {
    id: 7, titulo: "Operation: True Love", tipo: "manhwa",
    generos: ["romance","drama","escolar"], cover: "007.jpeg",
    sinopsis: "Su-ae descubre que su vida es controlada por un sistema de 'cantidad de amor'. Con la ayuda de un misterioso teléfono, intentará cambiar su destino amoroso.",
    urlManhwa: "https://tu-sitio.com/operation-true-love"
  },
  {
    id: 8, titulo: "The Girl I Like Forgot Her Glasses", tipo: ["manga", "anime"],
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "008.jpeg",
    sinopsis: "Komura siempre intenta ayudar a su compañera de asiento, Mie, quien constantemente olvida sus gafas y termina acercándose demasiado para poder ver.",
    urlManga: "https://tu-sitio.com/mie-glasses-manga",
    urlAnime: "https://tu-sitio.com/mie-glasses-anime"
  },
  {
    id: 9, titulo: "Psychic Princess", tipo: "donghua",
    generos: ["romance","fantasia","historico","anime"], temporadas: 1, cover: "009.jpeg",
    sinopsis: "Qian Yunxi, una princessa con poderes espirituales, es enviada a casarse con un príncipe cruel en lugar de su hermana, ocultando su verdadera identidad.",
    urlDonghua: "https://tu-sitio.com/psychic-princess"
  },
  {
    id: 10, titulo: "Something About Us", tipo: "manhwa",
    generos: ["romance","recuentos de la vida","escolar"], temporadas: 0, cover: "010.jpeg",
    sinopsis: "Una historia realista sobre dos mejores amigos de la infancia que empiezan a cuestionar si su relación es solo amistad o algo más profundo.",
    urlManhwa: "https://tu-sitio.com/something-about-us"
  },
  {
    id: 11, titulo: "More than a Married Couple, but Not Lovers", tipo: ["manga", "anime"],
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "011.jpeg",
    sinopsis: "En una práctica escolar de 'entrenamiento matrimonial', Jirou es emparejado con la popular Akari, mientras sus respectivos intereses amorosos están juntos.",
    urlManga: "https://tu-sitio.com/fuufu-ijou-manga",
    urlAnime: "https://tu-sitio.com/fuufu-ijou-anime"
  },
  {
    id: 12, titulo: "Maybe Meant to Be", tipo: "manhwa",
    generos: ["romance","comedia","adulto"], temporadas: 0, cover: "012.jpeg",
    sinopsis: "Cansada de la presión de sus padres por casarse, una mujer desempleada le propone matrimonio de broma a su amigo de la infancia, y él acepta.",
    urlManhwa: "https://tu-sitio.com/maybe-meant-to-be"
  },
  {
    id: 13, titulo: "Tomo-chan wa Onnanoko!", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "013.jpeg",
    sinopsis: "Tomo Aizawa es una chica masculina que finalmente se le confiesa a su amigo Jun, pero él piensa que solo le está hablando como 'uno de los chicos'.",
    urlManga: "https://tu-sitio.com/tomo-chan-manga",
    urlAnime: "https://tu-sitio.com/tomo-chan-anime"
  },
  {
    id: 14, titulo: "Adachi to Shimamura", tipo: "manga",
    generos: ["romance","recuentos de la vida","escolar","anime"], temporadas: 1, cover: "014.jpeg",
    sinopsis: "Dos chicas que suelen saltarse clases encuentran consuelo la una en la otra mientras su relación evoluciona lentamente de amistad a amor.",
    urlManga: "https://tu-sitio.com/adachi-shimamura-manga",
    urlAnime: "https://tu-sitio.com/adachi-shimamura-anime"
  },
  {
    id: 15, titulo: "The Angel Next Door Spoils Me Rotten", tipo: "manga",
    generos: ["romance","recuentos de la vida","escolar","anime"], temporadas: 1, cover: "015.jpeg",
    sinopsis: "Amane vive solo y descuida su salud, hasta que Mahiru, la chica más hermosa de la escuela y su vecina, decide empezar a cuidar de él.",
    urlManga: "https://tu-sitio.com/otonari-no-tenshi-manga",
    urlAnime: "https://tu-sitio.com/otonari-no-tenshi-anime"
  },
  {
    id: 16, titulo: "Who Made Me a Princess", tipo: "manhwa",
    generos: ["romance","fantasia","drama"], temporadas: 0, cover: "016.jpeg",
    sinopsis: "Una mujer reencarna en la princesa de una novela que está destinada a morir a manos de su propio padre. Su misión es ganarse su afecto.",
    urlManhwa: "https://tu-sitio.com/princess-athansia"
  },
  {
    id: 17, titulo: "An Archdemon's Dilemma", tipo: "manga",
    generos: ["romance","fantasia","accion","anime"], temporadas: 1, cover: "017.jpeg",
    sinopsis: "Zagan, un mago poderoso y torpe socialmente, compra a una esclava elfa por su belleza, pero no tiene ni idea de cómo hablarle o tratarla.",
    urlManga: "https://tu-sitio.com/archdemon-dilemma-manga",
    urlAnime: "https://tu-sitio.com/archdemon-dilemma-anime"
  },
  {
    id: 18, titulo: "No Doubt In Us", tipo: "donghua",
    generos: ["romance","comedia","historico","anime"], temporadas: 2, cover: "018.jpeg",
    sinopsis: "Un emperador y su esposa guerrera intercambian cuerpos por accidente. Deben aprender a vivir la vida del otro mientras mantienen las apariencias.",
    urlDonghua: "https://tu-sitio.com/no-doubt-in-us"
  },
  {
    id: 19, titulo: "Sign", tipo: "manhwa",
    generos: ["romance","recuentos de la vida"], temporadas: 0, cover: "019.jpeg",
    sinopsis: "Kang Soo-hwa empieza a trabajar en una cafetería donde el dueño es sordo. A través del lenguaje de señas, surge una conexión especial.",
    urlManhwa: "https://tu-sitio.com/sign-manhwa"
  },
  {
    id: 20, titulo: "Wotakoi: Love is Hard for Otaku", tipo: "manga",
    generos: ["romance","comedia","adulto","anime"], temporadas: 1, cover: "020.jpeg",
    sinopsis: "Narumi oculta que es una fujoshi, pero en su nuevo trabajo se reencuentra con Hirotaka, un gamer empedernido que ya conoce su secreto.",
    urlManga: "https://tu-sitio.com/wotakoi-manga",
    urlAnime: "https://tu-sitio.com/wotakoi-anime"
  },
  {
    id: 21, titulo: "Orange", tipo: "manga",
    generos: ["romance","drama","sci-fi","anime"], temporadas: 1, cover: "021.jpeg",
    sinopsis: "Naho recibe una carta de su yo del futuro pidiéndole que evite que el nuevo estudiante, Kakeru, muera por arrepentimientos.",
    urlManga: "https://tu-sitio.com/orange-manga",
    urlAnime: "https://tu-sitio.com/orange-anime"
  },
  {
    id: 22, titulo: "The Reason Why Raeliana Ended Up at the Duke's Mansion", tipo: "manhwa",
    generos: ["romance","misterio","fantasia","anime"], temporadas: 1, cover: "022.jpeg",
    sinopsis: "Eunha renace en una novela como una víctima secundaria. Para evitar su muerte, hace un trato con el duque Noah Wynknight.",
    urlManhwa: "https://tu-sitio.com/raeliana-manhwa",
    urlAnime: "https://tu-sitio.com/raeliana-anime"
  },
  {
    id: 23, titulo: "Ao Haru Ride", tipo: "manga",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "023.jpeg",
    sinopsis: "Futaba intenta reinventarse tras ser rechazada. Todo cambia cuando se reencuentra con su primer amor, Kou, quien ha cambiado mucho.",
    urlManga: "https://tu-sitio.com/blue-spring-ride-manga",
    urlAnime: "https://tu-sitio.com/blue-spring-ride-anime"
  },
  {
    id: 24, titulo: "Memory of Chang'an", tipo: "donghua",
    generos: ["romance","historico","drama","anime"], temporadas: 1, cover: "024.jpeg",
    sinopsis: "Una princesa es enviada a un matrimonio político para asegurar la paz, enfrentando las intrigas de la corte mientras busca el amor verdadero.",
    urlDonghua: "https://tu-sitio.com/memory-changan"
  },
  {
    id: 25, titulo: "Ouran High School Host Club", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "025.jpeg",
    sinopsis: "Haruhi rompe un jarrón carísimo y debe trabajar para el club de anfitriones de su escuela, ocultando que es una chica.",
    urlManga: "https://tu-sitio.com/ouran-host-club-manga",
    urlAnime: "https://tu-sitio.com/ouran-host-club-anime"
  },
  {
    id: 26, titulo: "Positively Yours", tipo: "manhwa",
    generos: ["romance","drama"], temporadas: 0, cover: "026.jpeg",
    sinopsis: "Tras una noche de despecho, Hee-won queda embarazada de un desconocido. Él le propone matrimonio y apoyo total.",
    urlManhwa: "https://tu-sitio.com/positively-yours-manhwa"
  },
  {
    id: 27, titulo: "Say I Love You", tipo: "manga",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "027.jpeg",
    sinopsis: "Mei es una chica solitaria que no cree en nadie. Un malentendido hace que Yamato, el chico más guapo, se interese en ella.",
    urlManga: "https://tu-sitio.com/say-i-love-you-manga",
    urlAnime: "https://tu-sitio.com/say-i-love-you-anime"
  },
  {
    id: 28, titulo: "Don't Toy With Me, Miss Nagatoro", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 2, cover: "028.jpeg",
    sinopsis: "Nagatoro disfruta molestando a su tímido senpai, pero detrás de sus burlas hay un afecto genuino que ambos empiezan a reconocer.",
    urlManga: "https://tu-sitio.com/nagatoro-manga",
    urlAnime: "https://tu-sitio.com/nagatoro-anime"
  },
  {
    id: 29, titulo: "Golden Time", tipo: "manga",
    generos: ["romance","drama","adulto","anime"], temporadas: 1, cover: "029.jpeg",
    sinopsis: "Banri sufre amnesia tras un accidente. En la universidad conoce a Kouko, una chica obsesiva que cambiará su vida para siempre.",
    urlManga: "https://tu-sitio.com/golden-time-manga",
    urlAnime: "https://tu-sitio.com/golden-time-anime"
  },
  {
    id: 30, titulo: "True Beauty", tipo: "manhwa",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "030.jpeg",
    sinopsis: "Jugyeong es una experta en maquillaje que oculta su rostro real. Se ve envuelta en un triángulo amoroso con dos chicos guapos.",
    urlManhwa: "https://tu-sitio.com/true-beauty-manhwa",
    urlAnime: "https://tu-sitio.com/true-beauty-anime"
  },
  {
    id: 31, titulo: "Love is Like a Cocktail", tipo: "manga",
    generos: ["romance","comedia","adulto","anime"], temporadas: 1, cover: "031.jpeg",
    sinopsis: "Chisato es una profesional seria, pero cuando su esposo le prepara un cóctel, muestra su lado más tierno y adorable.",
    urlManga: "https://tu-sitio.com/osake-wa-fufu-manga",
    urlAnime: "https://tu-sitio.com/osake-wa-fufu-anime"
  },
  {
    id: 32, titulo: "A Day Before Us", tipo: "donghua",
    generos: ["romance","recuentos de la vida","anime"], temporadas: 3, cover: "032.jpeg",
    sinopsis: "Cortometrajes animados que narran las dulces y a veces complicadas historias de amor de cuatro amigos en la universidad.",
    urlDonghua: "https://tu-sitio.com/a-day-before-us"
  },
  {
    id: 33, titulo: "Insomniacs After School", tipo: "manga",
    generos: ["romance","recuentos de la vida","escolar","anime"], temporadas: 1, cover: "033.jpeg",
    sinopsis: "Dos estudiantes que sufren de insomnio encuentran refugio en el antiguo observatorio de la escuela, compartiendo secretos.",
    urlManga: "https://tu-sitio.com/insomniacs-manga",
    urlAnime: "https://tu-sitio.com/insomniacs-anime"
  },
  {
    id: 34, titulo: "Business Proposal", tipo: "manhwa",
    generos: ["romance","comedia"], temporadas: 0, cover: "034.jpeg",
    sinopsis: "Ha-ri va a una cita a ciegas en lugar de su amiga para ahuyentar al pretendiente, solo para descubrir que él es su CEO.",
    urlManhwa: "https://tu-sitio.com/business-proposal-manhwa"
  },
  {
    id: 35, titulo: "Rent-a-Girlfriend", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 3, cover: "035.jpeg",
    sinopsis: "Kazuya, tras ser abandonado, alquila una novia. El enredo crece cuando debe mantener la mentira frente a su familia.",
    urlManga: "https://tu-sitio.com/kanojo-okarishimasu-manga",
    urlAnime: "https://tu-sitio.com/kanojo-okarishimasu-anime"
  },
  {
    id: 36, titulo: "My Little Monster", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "036.jpeg",
    sinopsis: "Shizuku solo se preocupa por sus notas hasta que conoce a Haru, un chico impulsivo que decide que ella será su primera amiga.",
    urlManga: "https://tu-sitio.com/tonari-no-kaibutsu-manga",
    urlAnime: "https://tu-sitio.com/tonari-no-kaibutsu-anime"
  },
  {
    id: 37, titulo: "The Ancient Magus' Bride", tipo: "manga",
    generos: ["romance","fantasia","sobrenatural","anime"], temporadas: 2, cover: "037.jpeg",
    sinopsis: "Chise se vende en una subasta y es comprada por Elias, un mago no humano que quiere convertirla en su aprendiz y esposa.",
    urlManga: "https://tu-sitio.com/mahoutsukai-no-yome-manga",
    urlAnime: "https://tu-sitio.com/mahoutsukai-no-yome-anime"
  },
  {
    id: 38, titulo: "I'm the Villainess, So I'm Taming the Final Boss", tipo: "manga",
    generos: ["romance","fantasia","comedia","anime"], temporadas: 1, cover: "038.jpeg",
    sinopsis: "Tras recuperar sus recuerdos, la villana de un juego decide seducir al Rey Demonio para evitar su propio final trágico.",
    urlManga: "https://tu-sitio.com/villainess-taming-boss-manga",
    urlAnime: "https://tu-sitio.com/villainess-taming-boss-anime"
  },
  {
    id: 39, titulo: "Secret Alliance", tipo: "manhwa",
    generos: ["romance","drama","psicologico"], temporadas: 0, cover: "039.jpeg",
    sinopsis: "Sian tiene fobia a los hombres. Su mejor amiga, quien en realidad es un chico disfrazado, intenta alejar a cualquier pretendiente.",
    urlManhwa: "https://tu-sitio.com/secret-alliance-manhwa"
  },
  {
    id: 40, titulo: "ReLIFE", tipo: "manga",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "040.jpeg",
    sinopsis: "Un desempleado de 27 años vuelve a tener 17 gracias a una pastilla. Encuentra una segunda oportunidad en la vida y el amor.",
    urlManga: "https://tu-sitio.com/relife-manga",
    urlAnime: "https://tu-sitio.com/relife-anime"
  },
  {
    id: 41, titulo: "Kamisama Kiss", tipo: "manga",
    generos: ["romance","comedia","sobrenatural","anime"], temporadas: 2, cover: "041.jpeg",
    sinopsis: "Nanami termina siendo la nueva deidad de un santuario y debe lidiar con Tomoe, un espíritu zorro que se convierte en su guardián.",
    urlManga: "https://tu-sitio.com/kamisama-hajimemashita-manga",
    urlAnime: "https://tu-sitio.com/kamisama-hajimemashita-anime"
  },
  {
    id: 42, titulo: "Spiritpact", tipo: "donghua",
    generos: ["romance","sobrenatural","accion","anime"], temporadas: 2, cover: "042.jpeg",
    sinopsis: "Un joven pobre muere y se convierte en el espíritu vinculado de un poderoso exorcista. Su lazo crece mientras combaten demonios.",
    urlDonghua: "https://tu-sitio.com/spiritpact"
  },
  {
    id: 43, titulo: "Sasaki and Miyano", tipo: "manga",
    generos: ["romance","recuentos de la vida","escolar","anime"], temporadas: 1, cover: "043.jpeg",
    sinopsis: "Miyano es fan de las historias BL. Cuando el senpai Sasaki se interesa por sus lecturas, surge una dulce e inesperada conexión.",
    urlManga: "https://tu-sitio.com/sasaki-miyano-manga",
    urlAnime: "https://tu-sitio.com/sasaki-miyano-anime"
  },
  {
    id: 44, titulo: "Nice to Meet You", tipo: "manhwa",
    generos: ["romance","comedia","escolar"], temporadas: 0, cover: "044.jpeg",
    sinopsis: "Mew es una chica despistada que encuentra la identificación de un chico guapo y decide devolverla de la forma más extraña posible.",
    urlManhwa: "https://tu-sitio.com/nice-to-meet-you-manhwa"
  },
  {
    id: 45, titulo: "My Love Story with Yamada-kun at Lv999", tipo: "manga",
    generos: ["romance","comedia","adulto","anime"], temporadas: 1, cover: "045.jpeg",
    sinopsis: "Akane es abandonada por su novio gamer. Jugando para desahogarse, conoce a Yamada, un jugador profesional de personalidad fría.",
    urlManga: "https://tu-sitio.com/yamada-lv999-manga",
    urlAnime: "https://tu-sitio.com/yamada-lv999-anime"
  },
  {
    id: 46, titulo: "Honey and Clover", tipo: "manga",
    generos: ["romance","drama","recuentos de la vida","anime"], temporadas: 2, cover: "046.jpeg",
    sinopsis: "Un grupo de estudiantes de arte navega por las dificultades de la vida adulta, el amor no correspondido y su talento.",
    urlManga: "https://tu-sitio.com/honey-clover-manga",
    urlAnime: "https://tu-sitio.com/honey-clover-anime"
  },
  {
    id: 47, titulo: "The Girl Downstairs", tipo: "manhwa",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "047.jpeg",
    sinopsis: "Un estudiante universitario descubre que su nueva vecina de abajo es una ex-idol famosa que se ha retirado del mundo.",
    urlManhwa: "https://tu-sitio.com/lee-doona-manhwa",
    urlAnime: "https://tu-sitio.com/lee-doona-anime"
  },
  {
    id: 48, titulo: "Kaguya-sama: Love is War", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 3, cover: "048.jpeg",
    sinopsis: "Dos genios orgullosos intentan mediante juegos psicológicos que el otro se confiese primero. El amor es una batalla estratégica.",
    urlManga: "https://tu-sitio.com/kaguya-war-manga",
    urlAnime: "https://tu-sitio.com/kaguya-war-anime"
  },
  {
    id: 49, titulo: "Bloom Into You", tipo: "manga",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "049.jpeg",
    sinopsis: "Yuu espera sentir las mariposas del amor. Cuando conoce a la presidenta del consejo estudiantil, su perspectiva cambia.",
    urlManga: "https://tu-sitio.com/yagate-kimi-ni-naru-manga",
    urlAnime: "https://tu-sitio.com/yagate-kimi-ni-naru-anime"
  },
  {
    id: 50, titulo: "Anitomo", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "050.jpeg",
    sinopsis: "Mai escucha a su hermano y a su amigo hablar. Resulta que el amigo de su hermano piensa que ella es adorable.",
    urlManga: "https://tu-sitio.com/anitomo-manga",
    urlAnime: "https://tu-sitio.com/anitomo-anime"
  },
    {
    id: 51, titulo: "Makeine: Too Many Losing Heroines!", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "051.jpeg",
    sinopsis: "Nukumizu es un chico común que termina presenciando cómo varias chicas populares de su escuela son rechazadas por sus respectivos intereses amorosos.",
    urlManga: "https://tu-sitio.com/makeine-manga",
    urlAnime: "https://tu-sitio.com/makeine-anime"
  },
  {
    id: 52, titulo: "Ao no Hako (Blue Box)", tipo: "manga",
    generos: ["romance","deportes","escolar","anime"], temporadas: 1, cover: "052.jpeg",
    sinopsis: "Taiki admira a Chinatsu desde lejos. Tras un giro del destino, ella termina viviendo en su casa, iniciando una convivencia llena de sentimientos y deportes.",
    urlManga: "https://tu-sitio.com/blue-box-manga",
    urlAnime: "https://tu-sitio.com/blue-box-anime"
  },
  {
    id: 53, titulo: "Chuunibyou demo Koi ga Shitai!", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 2, cover: "053.jpeg",
    sinopsis: "Yuta quiere dejar atrás sus delirios de secundaria, pero su vecina Rikka, quien aún vive en un mundo de fantasía, lo arrastra de nuevo a su locura.",
    urlManga: "https://tu-sitio.com/chuunibyou-manga",
    urlAnime: "https://tu-sitio.com/chuunibyou-anime"
  },
  {
    id: 54, titulo: "The Fragrant Flower Blooms with Dignity", tipo: "manga",
    generos: ["romance","drama","escolar"], temporadas: 0, cover: "054.jpeg",
    sinopsis: "Rintaro asiste a una escuela de chicos con mala fama, pero su vida cambia al conocer a Kaoruko, una estudiante de una refinada escuela para chicas.",
    urlManga: "https://tu-sitio.com/kaoru-hana-manga"
  },
  {
    id: 55, titulo: "Hokkaido Gals Are Super Adorable!", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "055.jpeg",
    sinopsis: "Tsubasa se muda de Tokio a Hokkaido y queda fascinado por Minami Fuyuki, una 'gal' que desafía el frío con su calidez y estilo.",
    urlManga: "https://tu-sitio.com/hokkaido-gals-manga",
    urlAnime: "https://tu-sitio.com/hokkaido-gals-anime"
  },
  {
    id: 56, titulo: "A Sign of Affection", tipo: "manga",
    generos: ["romance","recuentos de la vida","anime"], temporadas: 1, cover: "056.jpeg",
    sinopsis: "Yuki es una estudiante universitaria con discapacidad auditiva cuyo mundo empieza a expandirse tras conocer a Itsuomi, un chico que viaja por el mundo.",
    urlManga: "https://tu-sitio.com/yubisaki-manga",
    urlAnime: "https://tu-sitio.com/yubisaki-anime"
  },
  {
    id: 57, titulo: "The Quintessential Quintuplets", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 2, cover: "057.jpeg",
    sinopsis: "Futaro es contratado para ser tutor de cinco hermanas idénticas que odian estudiar. Una de ellas terminará siendo su esposa en el futuro.",
    urlManga: "https://tu-sitio.com/5-toubun-manga",
    urlAnime: "https://tu-sitio.com/5-toubun-anime"
  },
  {
    id: 58, titulo: "Clannad", tipo: "manga",
    generos: ["romance","drama","recuentos de la vida","anime"], temporadas: 2, cover: "058.jpeg",
    sinopsis: "Tomoya es un delincuente juvenil que ayuda a Nagisa a reabrir el club de teatro, descubriendo el valor de la familia y los amigos por el camino.",
    urlManga: "https://tu-sitio.com/clannad-manga",
    urlAnime: "https://tu-sitio.com/clannad-anime"
  },
  {
    id: 59, titulo: "Tsurezure Children", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "059.jpeg",
    sinopsis: "Una serie de historias cortas que exploran las diferentes formas en que los jóvenes se confiesan y viven sus primeros amores escolares.",
    urlManga: "https://tu-sitio.com/tsurezure-manga",
    urlAnime: "https://tu-sitio.com/tsurezure-anime"
  },
  {
    id: 60, titulo: "Toradora!", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "060.jpeg",
    sinopsis: "Ryuji y Taiga deciden ayudarse mutuamente para conquistar a sus respectivos mejores amigos, pero terminan acercándose más de lo esperado.",
    urlManga: "https://tu-sitio.com/toradora-manga",
    urlAnime: "https://tu-sitio.com/toradora-anime"
  },
  {
    id: 61, titulo: "Villains are Destined to Die", tipo: "manhwa",
    generos: ["romance","fantasia","drama"], temporadas: 0, cover: "061.jpeg",
    sinopsis: "Una chica despierta en el cuerpo de Penelope Eckart, la villana de un juego donde cada elección incorrecta la lleva directamente a la muerte.",
    urlManhwa: "https://tu-sitio.com/villains-die-manhwa"
  },
  {
    id: 62, titulo: "7th Time Loop", tipo: "manga",
    generos: ["romance","fantasia","anime"], temporadas: 1, cover: "062.jpeg",
    sinopsis: "Rishe ha vivido 7 vidas diferentes. En esta séptima oportunidad, el príncipe que la mató en su vida anterior le propone matrimonio de la nada.",
    urlManga: "https://tu-sitio.com/7th-loop-manga",
    urlAnime: "https://tu-sitio.com/7th-loop-anime"
  },
  {
    id: 63, titulo: "A Condition Called Love", tipo: "manga",
    generos: ["romance","escolar","anime"], temporadas: 1, cover: "063.jpeg",
    sinopsis: "Hotaru nunca ha entendido el amor, hasta que Hananoi le pide salir. Juntos aprenden qué significa realmente querer a alguien.",
    urlManga: "https://tu-sitio.com/hananoi-manga",
    urlAnime: "https://tu-sitio.com/hananoi-anime"
  },
  {
    id: 64, titulo: "Tying the Knot with an Amagami Sister", tipo: "manga",
    generos: ["romance","comedia","sobrenatural","anime"], temporadas: 1, cover: "064.jpeg",
    sinopsis: "Uryu sueña con estudiar medicina, pero termina viviendo en un templo con tres hermanas sacerdotisas con las que debe casarse para heredar el lugar.",
    urlManga: "https://tu-sitio.com/amagami-manga",
    urlAnime: "https://tu-sitio.com/amagami-anime"
  },
  {
    id: 65, titulo: "The Apothecary Diaries", tipo: "manga",
    generos: ["romance","misterio","historico","anime"], temporadas: 2, cover: "065.jpeg",
    sinopsis: "Maomao, una boticaria en el harén imperial, usa sus conocimientos sobre venenos para resolver misterios mientras el eunuco Jinshi vigila sus pasos.",
    urlManga: "https://tu-sitio.com/kusuriya-manga",
    urlAnime: "https://tu-sitio.com/kusuriya-anime"
  },
  {
    id: 66, titulo: "Horimiya", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 2, cover: "066.jpeg",
    sinopsis: "Hori es popular y Miyamura es sombrío. Cuando descubren el lado oculto del otro fuera de la escuela, nace una relación auténtica y sin pretensiones.",
    urlManga: "https://tu-sitio.com/horimiya-manga",
    urlAnime: "https://tu-sitio.com/horimiya-anime"
  },
  {
    id: 67, titulo: "Remarried Empress", tipo: "manhwa",
    generos: ["romance","drama","fantasia"], temporadas: 0, cover: "067.jpeg",
    sinopsis: "Navier era la emperatriz perfecta, hasta que su esposo trajo a una amante. Ella decide pedir el divorcio para casarse con otro emperador.",
    urlManhwa: "https://tu-sitio.com/remarried-empress"
  },
  {
    id: 68, titulo: "Snow White with the Red Hair", tipo: "manga",
    generos: ["romance","fantasia","anime"], temporadas: 2, cover: "068.jpeg",
    sinopsis: "Shirayuki huye de su reino tras ser perseguida por su inusual cabello rojo y encuentra refugio con el príncipe Zen del reino vecino.",
    urlManga: "https://tu-sitio.com/akagami-manga",
    urlAnime: "https://tu-sitio.com/akagami-anime"
  },
  {
    id: 69, titulo: "Wolf Girl and Black Prince", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "069.jpeg",
    sinopsis: "Erika miente diciendo que tiene novio. Convence al guapo Kyouya para fingir, pero él resulta ser un sádico que la trata como a su mascota.",
    urlManga: "https://tu-sitio.com/ookami-shoujo-manga",
    urlAnime: "https://tu-sitio.com/ookami-shoujo-anime"
  },
  {
    id: 70, titulo: "The Ice Guy and His Cool Female Colleague", tipo: "manga",
    generos: ["romance","recuentos de la vida","sobrenatural","anime"], temporadas: 1, cover: "070.jpeg",
    sinopsis: "Himuro es descendiente de una Yuki-onna y crea tormentas de nieve cuando se pone nervioso cerca de su calmada compañera Fuyutsuki.",
    urlManga: "https://tu-sitio.com/ice-guy-manga",
    urlAnime: "https://tu-sitio.com/ice-guy-anime"
  },
  {
    id: 71, titulo: "Romantic Killer", tipo: "manga",
    generos: ["romance","comedia","sobrenatural","anime"], temporadas: 1, cover: "071.jpeg",
    sinopsis: "Anzu solo quiere videojuegos y chocolate, pero una criatura mágica la obliga a vivir situaciones de juego Otome en la vida real.",
    urlManga: "https://tu-sitio.com/romantic-killer-manga",
    urlAnime: "https://tu-sitio.com/romantic-killer-anime"
  },
  {
    id: 72, titulo: "Our Dating Sim", tipo: "manhwa",
    generos: ["romance","drama","recuentos de la vida"], temporadas: 0, cover: "072.jpeg",
    sinopsis: "Dos antiguos amigos se reencuentran años después trabajando en el desarrollo de un simulador de citas, reabriendo viejas heridas y sentimientos.",
    urlManhwa: "https://tu-sitio.com/dating-sim-manhwa"
  },
  {
    id: 73, titulo: "Loving Yamada at Lv999!", tipo: "manga",
    generos: ["romance","comedia","videojuegos","anime"], temporadas: 1, cover: "073.jpeg",
    sinopsis: "Tras una ruptura, Akane conoce a un jugador profesional de personalidad fría en un RPG. ¿Podrá subir de nivel en el corazón de Yamada?",
    urlManga: "https://tu-sitio.com/yamada-lv999-manga",
    urlAnime: "https://tu-sitio.com/yamada-lv999-anime"
  },
  {
    id: 74, titulo: "Blue Spring Ride (Ao Haru Ride)", tipo: "manga",
    generos: ["romance","drama","escolar","anime"], temporadas: 1, cover: "074.jpeg",
    sinopsis: "Futaba intenta ser menos femenina para no atraer atención, pero el reencuentro con su primer amor, Kou, la obliga a enfrentar su pasado.",
    urlManga: "https://tu-sitio.com/ao-haru-ride-manga",
    urlAnime: "https://tu-sitio.com/ao-haru-ride-anime"
  },
  {
    id: 75, titulo: "Maid-sama!", tipo: "manga",
    generos: ["romance","comedia","escolar","anime"], temporadas: 1, cover: "075.jpeg",
    sinopsis: "Misaki es la estricta presidenta estudiantil, pero tiene un secreto: trabaja en un maid café. Usui, el chico más popular, la descubre.",
    urlManga: "https://tu-sitio.com/maid-sama-manga",
    urlAnime: "https://tu-sitio.com/maid-sama-anime"
  },
      {
    id: 76, titulo: "Kimetsu no Yaiba", tipo: ["manga", "anime"],
    generos: ["Acción", "Fantasía", "Aventura", "Shounen", "Historia", "Sobrenatural"], temporadas: 5, cover: "076.jpeg",
    sinopsis: "Tanjiro Kamado lucha por encontrar una cura para su hermana Nezuko, convertida en demonio, mientras se entrena para ser un cazador de demonios en un mundo lleno de peligros.",
    urlManga: "https://tu-sitio.com/kimetsu-no-yaiba-manga",
    urlAnime: "https://tu-sitio.com/kimetsu-no-yaiba-anime"
  },
  {
    id: 77, titulo: "Solo Leveling (Na Honjaman Level Up)", tipo: ["manhwa", "anime"],
    generos: ["Acción", "Aventura", "Fantasía", "Video Juegos", "Sobrenatural"], temporadas: 2, cover: "077.jpeg",
    sinopsis: "En un mundo donde cazadores deben luchar contra monstruos, el cazador más débil de la humanidad, Sung Jin-woo, obtiene un sistema que le permite subir de nivel sin límites.",
    urlManhwa: "https://tu-sitio.com/solo-leveling-manhwa",
    urlAnime: "https://tu-sitio.com/solo-leveling-anime"
  },
  {
    id: 78, titulo: "Mushoku Tensei: Isekai Ittara Honki Dasu", tipo: ["manga", "anime"],
    generos: ["Isekai", "Fantasía", "Aventura", "Ecchi", "Magia", "Viaje en el Tiempo"], temporadas: 3, cover: "078.jpeg",
    sinopsis: "Un hombre sin empleo muere y reencarna en un mundo de fantasía conservando sus recuerdos. Decide vivir esta nueva vida al máximo como Rudeus Greyrat.",
    urlManga: "https://tu-sitio.com/mushoku-tensei-manga",
    urlAnime: "https://tu-sitio.com/mushoku-tensei-anime"
  },
  {
    id: 79, titulo: "The Beginning After the End", tipo: ["manhwa"],
    generos: ["Acción", "Aventura", "Fantasía", "Isekai", "Magia", "Reencarnación"], cover: "079.jpeg",
    sinopsis: "El Rey Grey, un líder solitario y poderoso, reencarna en un mundo de magia y monstruos para corregir los errores de su pasado y proteger a su nueva familia.",
    urlManhwa: "https://tu-sitio.com/tbate-manhwa"
  },
  {
    id: 80, titulo: "Chainsaw Man", tipo: ["manga", "anime"],
    generos: ["Acción", "Terror", "Sobrenatural", "Shounen", "Drama", "Dark Fantasy"], temporadas: 2, cover: "080.jpeg",
    sinopsis: "Denji, un joven con una deuda astronómica, se fusiona con su perro demonio Pochita para convertirse en Chainsaw Man y cazar demonios para la seguridad pública.",
    urlManga: "https://tu-sitio.com/chainsaw-man-manga",
    urlAnime: "https://tu-sitio.com/chainsaw-man-anime"
  },
  {
    id: 81, titulo: "Jujutsu Kaisen", tipo: ["manga", "anime"],
    generos: ["Acción", "Sobrenatural", "Escolar", "Shounen", "Terror", "Artes Marciales"], temporadas: 3, cover: "081.jpeg",
    sinopsis: "Yuji Itadori ingiere un dedo maldito para salvar a sus amigos y termina albergando al Rey de las Maldiciones, Sukuna, viéndose forzado a unirse a la escuela de hechicería.",
    urlManga: "https://tu-sitio.com/jujutsu-kaisen-manga",
    urlAnime: "https://tu-sitio.com/jujutsu-kaisen-anime"
  },
  {
    id: 82, titulo: "Omniscient Reader's Viewpoint", tipo: ["manhwa", "anime"],
    generos: ["Acción", "Aventura", "Fantasía", "Psicológico", "Supervivencia", "Apocalipsis"], temporadas: 1, cover: "082.jpeg",
    sinopsis: "Kim Dokja era el único lector de una novela apocalíptica. De repente, el mundo de la novela se vuelve realidad y él es el único que sabe cómo terminará la historia.",
    urlManhwa: "https://tu-sitio.com/orv-manhwa",
    urlAnime: "https://tu-sitio.com/orv-anime"
  },
  {
    id: 83, titulo: "Re:Zero kara Hajimeru Isekai Seikatsu", tipo: ["manga", "anime"],
    generos: ["Isekai", "Drama", "Fantasía", "Psicológico", "Viaje en el Tiempo", "Misterio"], temporadas: 3, cover: "083.jpeg",
    sinopsis: "Subaru Natsuki es transportado a otro mundo donde descubre que tiene el poder de 'Regresar de la Muerte', una habilidad dolorosa que usa para salvar a sus seres queridos.",
    urlManga: "https://tu-sitio.com/re-zero-manga",
    urlAnime: "https://tu-sitio.com/re-zero-anime"
  },
  {
    id: 84, titulo: "Tensei Shitara Slime Datta Ken", tipo: ["manga", "anime"],
    generos: ["Isekai", "Fantasía", "Aventura", "Comedia", "Magia", "Shounen"], temporadas: 3, cover: "084.jpeg",
    sinopsis: "Satoru Mikami reencarna en otro mundo como un Slime con habilidades únicas. Bajo el nombre de Rimuru Tempest, decide crear una nación donde todos vivan en paz.",
    urlManga: "https://tu-sitio.com/tensura-manga",
    urlAnime: "https://tu-sitio.com/tensura-anime"
  },
  {
    id: 85, titulo: "Vagabond", tipo: ["manga"],
    generos: ["Acción", "Historia", "Artes Marciales", "Seinen", "Drama", "Psicológico"], cover: "085.jpeg",
    sinopsis: "Basada en la vida del legendario espadachín Miyamoto Musashi, narra su sangriento camino hacia la iluminación y la búsqueda de la verdadera fuerza.",
    urlManga: "https://tu-sitio.com/vagabond-manga"
  },
  {
    id: 86, titulo: "Kage no Jitsuryokusha ni Naritakute!", tipo: ["manga", "anime"],
    generos: ["Acción", "Isekai", "Comedia", "Fantasía", "Magia", "Harem"], temporadas: 2, cover: "086.jpeg",
    sinopsis: "Cid quiere ser el 'eminencia en las sombras'. Tras reencarnar, crea una organización ficticia para luchar contra un culto real que él cree que no existe.",
    urlManga: "https://tu-sitio.com/eminenza-ombra-manga",
    urlAnime: "https://tu-sitio.com/eminenza-ombra-anime"
  },
  {
    id: 87, titulo: "The Breaker", tipo: ["manhwa"],
    generos: ["Acción", "Artes Marciales", "Drama", "Escolar", "Murim", "Shounen"], cover: "087.jpeg",
    sinopsis: "Shi-Woon es un estudiante acosado que termina convirtiéndose en el discípulo de un misterioso maestro de artes marciales que pertenece al mundo oculto del Murim.",
    urlManhwa: "https://tu-sitio.com/the-breaker-manhwa"
  },
  {
    id: 88, titulo: "Cyberpunk: Edgerunners", tipo: ["anime"],
    generos: ["Acción", "Sci-Fi", "Cyberpunk", "Psicológico", "Crimen", "Drama"], temporadas: 1, cover: "088.jpeg",
    sinopsis: "En una distopía plagada de corrupción e implantes cibernéticos, un chico de la calle intenta sobrevivir convirtiéndose en un Edgerunner, un mercenario fuera de la ley.",
    urlAnime: "https://tu-sitio.com/cyberpunk-anime"
  },
  {
    id: 89, titulo: "Berserk", tipo: ["manga", "anime"],
    generos: ["Acción", "Fantasía", "Terror", "Dark Fantasy", "Seinen", "Drama"], temporadas: 2, cover: "081.jpeg",
    sinopsis: "Guts, el Guerrero Negro, busca venganza contra su antiguo camarada Griffith mientras lucha contra hordas de apóstoles demoníacos en un mundo cruel.",
    urlManga: "https://tu-sitio.com/berserk-manga",
    urlAnime: "https://tu-sitio.com/berserk-anime"
  },
  {
    id: 90, titulo: "Kaiju No. 8", tipo: ["manga", "anime"],
    generos: ["Acción", "Sci-Fi", "Militar", "Shounen", "Sobrenatural", "Comedia"], temporadas: 2, cover: "090.jpeg",
    sinopsis: "Kafka Hibino, un limpiador de cadáveres de monstruos, obtiene la capacidad de transformarse en un Kaiju y decide intentar unirse de nuevo al cuerpo de defensa.",
    urlManga: "https://tu-sitio.com/kaiju-8-manga",
    urlAnime: "https://tu-sitio.com/kaiju-8-anime"
  },
  {
    id: 91, titulo: "Shangri-La Frontier", tipo: ["manga", "anime"],
    generos: ["Acción", "Aventura", "Video Juegos", "Fantasía", "Shounen", "Comedia"], temporadas: 2, cover: "091.jpeg",
    sinopsis: "Rakuro es un experto en pasar juegos mediocres. Esta vez decide probar un juego AAA legendario, usando sus habilidades de 'cazador de basura' para dominar el mundo virtual.",
    urlManga: "https://tu-sitio.com/shangri-la-manga",
    urlAnime: "https://tu-sitio.com/shangri-la-anime"
  },
  {
    id: 92, titulo: "Nano Machine", tipo: ["manhwa"],
    generos: ["Acción", "Aventura", "Ciencia Ficción", "Murim", "Artes Marciales", "Cultivo/Xianxia"], cover: "092.jpeg",
    sinopsis: "Un descendiente del futuro visita al joven Cheon Yeo-Woon del culto demoníaco y le inyecta nanomáquinas en su cuerpo para cambiar su destino.",
    urlManhwa: "https://tu-sitio.com/nano-machine-manhwa"
  },
  {
    id: 93, titulo: "Blue Lock", tipo: ["manga", "anime"],
    generos: ["Deportes", "Acción", "Shounen", "Psicológico", "Drama", "Escolar"], temporadas: 2, cover: "093.jpeg",
    sinopsis: "Japón busca al mejor delantero del mundo mediante un entrenamiento extremo en una instalación llamada Blue Lock, donde 300 delanteros compiten por sobrevivir.",
    urlManga: "https://tu-sitio.com/blue-lock-manga",
    urlAnime: "https://tu-sitio.com/blue-lock-anime"
  },
  {
    id: 94, titulo: "Hell's Paradise: Jigokuraku", tipo: ["manga", "anime"],
    generos: ["Acción", "Aventura", "Fantasía", "Shounen", "Historia", "Sobrenatural"], temporadas: 2, cover: "094.jpeg",
    sinopsis: "Un ninja condenado a muerte es enviado a una isla misteriosa para encontrar el elixir de la vida a cambio de su perdón, enfrentándose a horrores divinos.",
    urlManga: "https://tu-sitio.com/jigokuraku-manga",
    urlAnime: "https://tu-sitio.com/jigokuraku-anime"
  },
  {
    id: 95, titulo: "Overlord", tipo: ["manga", "anime"],
    generos: ["Acción", "Isekai", "Fantasía", "Sobrenatural", "Magia", "Dark Fantasy"], temporadas: 4, cover: "095.jpeg",
    sinopsis: "Cuando su videojuego favorito cierra, Momonga decide quedarse conectado y es transportado al mundo real del juego como su avatar, el poderoso esqueleto Ainz Ooal Gown.",
    urlManga: "https://tu-sitio.com/overlord-manga",
    urlAnime: "https://tu-sitio.com/overlord-anime"
  },
  {
    id: 96, titulo: "Tate no Yuusha no Nariagari", tipo: ["manga", "anime"],
    generos: ["Isekai", "Fantasía", "Acción", "Drama", "Aventura", "Shounen"], temporadas: 3, cover: "096.jpeg",
    sinopsis: "Naofumi es invocado como el Héroe del Escudo. Tras ser traicionado y despreciado, debe reconstruir su reputación desde cero con la ayuda de su esclava Raphtalia.",
    urlManga: "https://tu-sitio.com/tate-no-yuusha-manga",
    urlAnime: "https://tu-sitio.com/tate-no-yuusha-anime"
  },
  {
    id: 97, titulo: "Kingdom", tipo: ["manga", "anime"],
    generos: ["Acción", "Historia", "Militar", "Seinen", "Drama", "Guerra"], temporadas: 5, cover: "097.jpeg",
    sinopsis: "En la antigua China, dos huérfanos de guerra sueñan con convertirse en los grandes generales de los cielos, ayudando al rey de Qin a unificar el país.",
    urlManga: "https://tu-sitio.com/kingdom-manga",
    urlAnime: "https://tu-sitio.com/kingdom-anime"
  },
  {
    id: 98, titulo: "Hellsing Ultimate", tipo: ["manga", "anime"],
    generos: ["Acción", "Terror", "Vampiros", "Sobrenatural", "Militar", "Seinen"], temporadas: 1, cover: "098.jpeg",
    sinopsis: "La organización Hellsing emplea al poderoso vampiro Alucard para proteger a Inglaterra de amenazas sobrenaturales y ejércitos de no-muertos.",
    urlManga: "https://tu-sitio.com/hellsing-manga",
    urlAnime: "https://tu-sitio.com/hellsing-anime"
  },
  {
    id: 99, titulo: "Youjo Senki (Saga of Tanya the Evil)", tipo: ["manga", "anime"],
    generos: ["Acción", "Isekai", "Militar", "Magia", "Fantasía", "Guerra"], temporadas: 2, cover: "099.jpeg",
    sinopsis: "Un asalariado ateo es reencarnado por una entidad divina en el cuerpo de una niña en medio de una guerra mágica mundial, convirtiéndose en una táctica despiadada.",
    urlManga: "https://tu-sitio.com/youjo-senki-manga",
    urlAnime: "https://tu-sitio.com/youjo-senki-anime"
  },
  {
    id: 100, titulo: "Vinland Saga", tipo: ["manga", "anime"],
    generos: ["Acción", "Historia", "Aventura", "Drama", "Seinen", "Guerra"], temporadas: 2, cover: "100.jpeg",
    sinopsis: "Thorfinn, hijo de un gran guerrero vikingo, busca venganza contra el hombre que mató a su padre, viéndose envuelto en la conquista de Inglaterra.",
    urlManga: "https://tu-sitio.com/vinland-saga-manga",
    urlAnime: "https://tu-sitio.com/vinland-saga-anime"
  },






  // ── Agrega nuevos títulos debajo de esta línea ────────────
  // {
  //   id: 21, titulo: "...", tipo: "manga",
  //   generos: ["..."], temporadas: 1, cover: "...",
  //   sinopsis: "Descripción del título.",
  //   urlAnime  : "https://tu-sitio.com/...",   // opcional
  //   urlManga  : "https://tu-sitio.com/...",   // opcional
  //   urlManhwa : "https://tu-sitio.com/...",   // opcional
  //   urlDonghua: "https://tu-sitio.com/...",   // opcional
  //   // url    : "https://tu-sitio.com/...",   // solo si no hay ninguno de arriba
  // },
];
