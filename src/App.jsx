import { useState } from "react";
import { Analytics } from '@vercel/analytics/react';

// ── DATA ──────────────────────────────────────────────────────────────────────
const DEMO = {
  nombre: "Debora Moratalla Martín",
  fecha: "25 oct 1986", hora: "3:00h", lugar: "Madrid, España",
  planetas: [
    { p:"Sol",      g:"☉", s:"Escorpio",    c:3,  deg:232.42, grado:"22°25'", r:false, el:"agua" },
    { p:"Luna",     g:"☽", s:"Cáncer",      c:10, deg:98.60,  grado:"08°36'", r:false, el:"agua" },
    { p:"Mercurio", g:"☿", s:"Escorpio",    c:3,  deg:235.38, grado:"25°23'", r:false, el:"agua" },
    { p:"Venus",    g:"♀", s:"Escorpio",    c:3,  deg:228.62, grado:"18°37'", r:true,  el:"agua" },
    { p:"Marte",    g:"♂", s:"Acuario",     c:5,  deg:309.30, grado:"09°18'", r:false, el:"aire" },
    { p:"Júpiter",  g:"♃", s:"Piscis",      c:7,  deg:343.32, grado:"13°19'", r:true,  el:"agua" },
    { p:"Saturno",  g:"♄", s:"Sagitario",   c:3,  deg:247.60, grado:"07°36'", r:false, el:"fuego"},
    { p:"Urano",    g:"♅", s:"Sagitario",   c:4,  deg:259.73, grado:"19°44'", r:false, el:"fuego"},
    { p:"Neptuno",  g:"♆", s:"Capricornio", c:4,  deg:273.47, grado:"03°28'", r:false, el:"tierra"},
    { p:"Plutón",   g:"♇", s:"Escorpio",    c:2,  deg:217.05, grado:"07°03'", r:false, el:"agua" },
    { p:"Nodo N.",  g:"☊", s:"Aries",       c:8,  deg:20.80,  grado:"20°48'", r:false, el:"fuego"},
    { p:"Quirón",   g:"⚷", s:"Géminis",     c:10, deg:80.95,  grado:"20°57'", r:true,  el:"aire" },
    { p:"Lilith",   g:"⚸", s:"Libra",       c:2,  deg:200.80, grado:"20°48'", r:false, el:"aire" },
    { p:"Ceres",    g:"⚳", s:"Escorpio",    c:2,  deg:216.02, grado:"06°01'", r:false, el:"agua", ast:true },
    { p:"Palas",    g:"⚴", s:"Libra",       c:2,  deg:194.67, grado:"14°40'", r:false, el:"aire", ast:true },
    { p:"Juno",     g:"⚵", s:"Sagitario",   c:4,  deg:257.60, grado:"17°36'", r:false, el:"fuego",ast:true },
    { p:"Vesta",    g:"⚶", s:"Aries",       c:7,  deg:4.75,   grado:"04°45'", r:true,  el:"fuego",ast:true },
  ],
  // ── SIGNO OCULTO (base: apuntes Enzo, Clases 10-14) ──
  signoOculto:{
    signo:"Piscis",
    casa:"Casa 7",
    casaTitulo:"El amor idealizado",
    definicion:"El signo oculto es el código encriptado que trae la información de cada sistema familiar, donde el individuo encuentra las claves para desanudar sus embrollos sistémicos. Muestra las luces y sombras que traemos, los potenciales despiertos o los puntos ciegos, y aquellas trampas psicológicas en las que caemos constantemente. Nos habla de nuestro destino individual.",
    calculo:"Se cuenta cada planeta según su elemento y cualidad en la tabla de evaluación. El signo oculto NO puede ser el signo del Sol, la Luna ni el Ascendente. En la carta de Debora, con Sol en Escorpio, Luna en Cáncer y AC en Virgo, el elemento Agua domina y la cualidad mutable señala a Piscis como signo oculto.",
    aforismo:"El verdadero sentido de la fe no se basa en la creencia ciega en lo desconocido, sino en la confianza incondicional de lo que yace aparentemente escondido en el interior del propio ser.",
    donOculto:"Sanador por excelencia. Puede sanar a través de cualquier herramienta: el arte, la palabra, la música, el cuerpo.",
    virtud:"Estar despierto — la virtud sanadora que permite que los cambios no le pasen por encima.",
    vicio:"La negación de la realidad. Cree solo en lo que le conviene, lo que puede dejarle anestesiado. Debe aprender a disociarse de las rutinas que le anestesian, a despertar y desenredarse de la memoria agua que le enreda en conflictos amorosos.",
    retos:[
      "¿Hasta dónde permito que me manipulen?",
      "¿He aprendido a establecer mis límites?",
      "¿Puedo ayudar sin exponerme a salvar a los demás?",
    ],
    somatico:"Retención de líquidos, insomnio, estados depresivos, ausentismo de la realidad, ansiedad por enfermedad, hipocondría. Se repiten estos patrones si se enreda con el pasado y con el miedo a las carencias afectivas.",
    proposito:"El sentido de una verdadera espiritualidad a través de la acción, la práctica coherente y el reconocer los límites de la ayuda. Desarrollar la vocación de servicio con fe, pero acompañada del esfuerzo y el sentido común personal.",
    casaLectura:"En Casa 7, «el amor idealizado» (eje 7-1). El tema sistémico es la idealización del amor y la relación de pareja; la trampa psicológica es el autoengaño y la disolución de los propios límites en el vínculo. El don oculto es la entrega; el propósito terapéutico, poner límites. La frase sistémica que ordena: «Elijo con conciencia». Se vienen a sanar relaciones inconclusas y heridas afectivas del linaje, aprendiendo a elegir desde la lucidez y no desde la fusión.",
    planetasEn:"Júpiter℞ y Vesta℞ en Casa 7 refuerzan este signo oculto: amplían la vocación de entrega y el ideal en los vínculos, pero piden cuidar la desmesura, el sacrificio y la idealización del otro.",
  },
  // ── ASCENDENTE SISTÉMICO (base: Clase 17 + casas derivadas) ──
  ascendente:{
    ac:"Virgo 9°45'",
    mc:"Géminis 6°22'",
    definicion:"El Ascendente Sistémico es la puerta de entrada al árbol: marca desde qué lugar el sistema familiar te colocó y qué papel esperaba de ti. A través de las casas derivadas, la carta se convierte en un mapa del linaje — cada casa representa a una figura del sistema y su historia.",
    acLectura:"Ascendente Virgo: el sistema pidió servicio, discernimiento, utilidad y perfección. La entrada al mundo se hizo desde el análisis, el cuidado del detalle y la sensación de tener que ser útil para merecer un lugar. La sombra: autoexigencia, crítica e hipervigilancia heredadas.",
    mcLectura:"Medio Cielo en Géminis: la vocación pública se orienta a la palabra, la comunicación, el aprendizaje y la transmisión. El linaje llama a un lugar en el mundo ligado a comunicar, enseñar o mediar.",
    casasDerivadasIntro:"Las casas derivadas permiten leer, desde el Ascendente del consultante, la carta de cada miembro del sistema. Se cuenta girando la rueda: la Casa 4 es la madre, la 10 el padre, y desde ahí se derivan abuelos y bisabuelos.",
  },
  saturno_placeholder_removed:null,
  // ── ASTEROIDES FEMENINOS (base: Notion 02_Cuerpos_Astrologicos_Sistemicos) ──
  asteroides:{
    intro:"Los cuatro asteroides femeninos revelan figuras concretas del linaje —madre, hija, esposa, hermana— y las memorias que portan. En una carta con memoria enfática Agua y linaje femenino dominante, son especialmente reveladores. Se activan a través de sus aspectos y su posición.",
    lista:[
      {
        g:"⚳", nombre:"Ceres", arquetipo:"La Madre", elemento:"Tierra", pos:"Escorpio · Casa 2",
        lectura:"Ceres simboliza la nutrición y el cuidado. Revela vínculos madre-hijo y heridas de abandono. Memoria nutritiva de la Tierra: el arquetipo protector, la responsabilidad y los valores.",
        conflicto:"Herida de abandono, simbiosis madre–hija, pérdidas de hijos. Control emocional, hambre afectiva, carencias materiales.",
        manifestacion:"Relación compleja con la comida, el cuerpo y el cuidado. Madres sobreprotectoras o personas cuidadoras compulsivas. Temas de fertilidad, abortos, depresión.",
        pregunta:"¿De qué forma aprendí a nutrir y a ser nutrida?",
        matiz:"En Escorpio Casa 2, el cuidado se liga a la intensidad, el control y los recursos: nutrir como forma de poder o de retener.",
      },
      {
        g:"⚴", nombre:"Palas", arquetipo:"La Hija", elemento:"Aire", pos:"Libra · Casa 2",
        lectura:"Palas Atenea representa la inteligencia estratégica y la hija del padre. Revela mujeres brillantes protegidas emocionalmente. Memoria aérea y mental: el arquetipo femenino intelectual, conectado con la cabeza y no con el corazón.",
        conflicto:"Mujeres del linaje que sobrevivieron usando la mente y no el corazón. Dolor cubierto con coraza intelectual.",
        manifestacion:"Personas estratégicas, brillantes, resolutivas, poco conectadas con la emoción. Búsqueda de reconocimiento por la inteligencia. Protección del padre incluso conociendo su «historia negra».",
        pregunta:"¿Qué emoción estoy protegiendo detrás de mi inteligencia?",
        matiz:"En Libra Casa 2, la inteligencia se pone al servicio del vínculo y del valor propio: pensar para mantener el equilibrio y merecer un lugar.",
      },
      {
        g:"⚵", nombre:"Juno", arquetipo:"La Esposa", elemento:"Agua", pos:"Sagitario · Casa 4",
        lectura:"Juno representa el compromiso y el matrimonio. Revela lealtades afectivas y heridas por traición. Memoria emocional y visceral del agua: la esposa que necesita del compromiso y de formar un vínculo estable.",
        conflicto:"Heridas de traición, deslealtad, celos. Mandato de «tener pareja» como validación social.",
        manifestacion:"Relaciones donde la identidad depende del otro. Celos, control, miedo a la infidelidad. Conflictos entre pareja y profesión.",
        pregunta:"¿Qué espero de la pareja y desde qué mandato lo hago?",
        matiz:"En Sagitario Casa 4, el compromiso se busca desde el sentido y la creencia, con raíces en el hogar de origen: el matrimonio como fe y como pertenencia.",
      },
      {
        g:"⚶", nombre:"Vesta", arquetipo:"La Hermana mayor", elemento:"Fuego", pos:"Aries · Casa 7 ℞",
        lectura:"Vesta simboliza el fuego interior y la renuncia. Revela mujeres que sostuvieron al sistema desde la retirada. Memoria intuitiva del fuego, conectada con lo espiritual y el fuego del hogar — no con la búsqueda del éxito ni la acción.",
        conflicto:"Mujeres que se quedaron solas, viudas, abandonadas o cuidando a los padres. Sacrificio silencioso y retiro del mundo.",
        manifestacion:"Personas discretas, responsables, que sostienen sin exponerse. Búsqueda de foco, rituales, espiritualidad. Florece con la madurez (50+).",
        pregunta:"¿A quién estoy cuidando olvidándome de mí?",
        matiz:"En Aries Casa 7 y retrógrada, el fuego de la renuncia se juega en los vínculos: darse a la relación desde una entrega que puede olvidarse de sí misma.",
      },
    ],
  },
  // ── MEMORIA SISTÉMICA (base: apuntes Enzo De Paola, Clases 7-9) ──
  memoria:{
    definicion:"Un todo de información que se acumula a lo largo de la historia familiar y queda enquistado en el campo mórfico, y que puede manifestarse a través de sincronicidades en nuestra historia de vida. La carta muestra con qué parte tenemos una lealtad — lo que no impide que existan otras memorias en el árbol.",
    tipos:"La memoria enfática es cuando hay mayor fuerza en un solo elemento. Puede haber memorias bifásicas o trifásicas cuando empatan varios elementos. Y hay ausencia de memoria cuando un elemento no tiene ningún planeta — no significa que la persona no pueda conectar con él, solo que le costará más expresarlo en su vida.",
    dominante:{
      elemento:"Agua",
      pct:"8 de 17 · enfática",
      jung:"Sentimiento",
      linaje:"Femenino",
      generacional:"Mamá, pareja actual, hermanos, hijos",
      representantes:"Mujeres sensibles, hermano presente y ausente, hijo nacido y no nacido",
      emocion:"Alegría, tristeza, angustia. Si la tristeza se desproporciona puede derivar en depresión. Surge por la sensación de abandono y falta de reconocimiento en el pasado.",
      proyeccion:"Sublimación, negación, evitación, extremismo, manipulación.",
      arquetipos:"Monja, sacerdote, bruja, mago, verdugo, sanador y poeta.",
      tema:"La emocionalidad familiar. El amor y sus raíces. Los contratos ocultos. Las relaciones de pareja previas. Los traumas de vinculación y la simbiosis afectiva. Los secretos de la familia. Los abusos. La sexualidad.",
      descripcion:"La memoria agua conecta con hermanos y con lo que viene de afuera — parejas, vínculos, nexos. Muy relacionada con los secretos más guardados de la familia: todo el mundo lo sabe pero nadie lo dice. Estas figuras han podido estar presentes en el linaje y ser vistas como algo negativo. Rescatarlas y dejarlas fluir honra las prohibiciones del pasado. Es la memoria más ligada a la sexualidad y a los asuntos amorosos siempre por resolver.",
      embrollos:"Contratos ocultos con los padres como guiones afectivos futuros. La búsqueda de estas ausencias se orienta al alcoholismo, la sexo-dependencia y los fármacos. Historias de mujeres que sufrieron abusos. La pérdida o muertes que se vuelven duelos y aniversarios fantasma. Los abortos y las maldiciones por heridas de amor.",
      talentos:"Música, dotes histriónicos, percepción extrasensorial, sanación, vocación de servicio, inspiración artística, misticismo. Afinidad con el agua.",
      sintomas:"Riñones, senos, ovarios, útero, vesícula, páncreas, pies planos, hipófisis e hipotálamo.",
    },
    ausencia:{
      elemento:"Tierra",
      jung:"Sensación",
      titulo:"Falta de arraigo",
      puntos:[
        "Falta de arraigo. Sensación de vivir situaciones, momentos y experiencias «aterrados» — sin tierra bajo los pies.",
        "La conexión con la realidad es pobre; puede provocar pérdida de valoración por todo lo sustancial.",
        "Dificultad para diferenciar lo importante, lo práctico y lo concreto de lo pasajero, superficial y etéreo.",
        "Ancestralmente, alguien no acabó lo que inició, o buscaba una realidad a medias. Alguien fue desterrado.",
      ],
      queRepresenta:"La tierra es sensación, seguridad ante las pérdidas, arraigo, cuerpo, materia y estructura. Su linaje es femenino: abuelas y madre; mujeres de autoridad en la familia.",
      integrar:"El sistema buscará activamente la tierra en los vínculos, el entorno y el cuerpo. El trabajo terapéutico invita a buscar actividades que conecten con el cuerpo y lo concreto — cocinar, construir, cultivar, sostener rutinas — como forma de arraigar lo que el linaje dejó sin terminar.",
    },
  },
  saturno:{
    mandatoDef:"Del latín manus (mano) + dare (dar): un encargo que debe darse en mano. Hay que cumplir con algo para poder pertenecer. Tal como se vive Saturno en la carta, así se transmiten las reglas a los hijos — derivan de lo que nos enseñaron y comprendimos del mundo. No solo hablan de mandatos familiares, sino de mentores o tutores que nos transmitieron reglas que duran toda la vida.",
    signo:"Sagitario",
    signoNarrativa:"El signo plantea la narrativa del tipo de mandato heredado. En Sagitario, los mandatos giran en torno a la fe, la creencia, el sentido de vida y la necesidad de trascender.",
    casa:"Casa 3",
    casaNarrativa:"La casa señala desde qué ámbito se viven esos mandatos. En Casa 3, el mandato opera en el terreno del aprendizaje, la palabra, los hermanos y el pensamiento cotidiano.",
    casaLectura:"Saturno en Casa 3 se expresa como comunicación responsable y prudente, ideas claras y precisas. Puede haber habido problemas del habla a edad temprana, aprendizaje lento, o hermanos que imponían la disciplina en el hogar — o bien ausencia de relaciones fraternas. La sombra: limitaciones al expresarse, timidez, rigidez o arrogancia defensiva.",
    casaEscenario:"La Casa 3 es el escenario del primer aprendizaje: cuando el niño toma conciencia de una realidad separada de la madre y empieza a moverse y comunicarse. Describe el estilo mental —cómo pensamos— y cómo nos relacionamos con hermanos, vecinos y el entorno cotidiano.",
    mandatos:[
      {t:"«Que sea la voluntad de Dios»", d:"Estar sujetos a las creencias espirituales y a las leyes divinas."},
      {t:"«Deposito mi fe en ti»", d:"La responsabilidad de transmitir lo que se cree por medio de otros."},
      {t:"«Lo que debes hacer con tu vida»", d:"Toma de conciencia o crisis existenciales para definir un sendero."},
      {t:"«Debes llegar lejos, muy alto»", d:"El mandato de ir más allá sin conformidad, con la convicción de trascender."},
      {t:"«Tus ideales son elevados»", d:"Mantener los sueños vivos, la visión de alcanzar grandes metas y propósitos."},
    ],
    integrado:"Cuando las bases familiares se vivieron desde un orden sano, esta posición dispone oportunidades confiables: una formación sólida, la fe en una doctrina que estructura el sentido espiritual, y conexiones firmes con otras culturas y lugares que brindan seguridad y permanencia.",
    noIntegrado:"Puede formarse, literal o simbólicamente, un miedo a volar. Los desafíos y las altas expectativas asustan y generan bloqueos; el futuro se vuelve difícil de creer. El niño criado bajo una educación dogmática puede sufrir decepciones morales, y el derrumbe de los cimientos de su fe puede derivar en posturas de ruptura con lo heredado.",
    claveLiberadora:"Creencia interior",
    aspectos:[
      {asp:"♄ ⚻ ☽", nom:"Saturno quíncuncio Luna", desc:"El mandato viene de la línea materna, en concreto de la figura de una abuela del sistema: la obligación de hacerse cargo de la familia, la rigidez emocional, la dificultad de expresar los sentimientos. La línea emocional hereditaria tiende a la limitación y la culpa.", figura:"La abuela / lo materno"},
      {asp:"♄ ⚹ ♂", nom:"Saturno sextil Marte", desc:"Recurso disponible: la capacidad de disciplinar la acción y sostener el esfuerzo, heredada de los abuelos y de lo que vivieron en su juventud. Una energía constructiva que pide activarse conscientemente.", figura:"Los abuelos / lo masculino estructurado"},
      {asp:"♄ □ ♃", nom:"Saturno cuadratura Júpiter", desc:"Tensión entre la estructura y la expansión: el mandato de contenerse frente al impulso de ir más allá. Vacíos afectivos y conflictos no resueltos con las figuras de autoridad que piden aceptación e integración.", figura:"El padre / la autoridad"},
    ],
    aspectoLeyenda:"Los aspectos a Saturno (hasta Júpiter) revelan de qué figura provienen los mandatos: Saturno-Sol, del padre; Saturno-Luna, de la madre; Saturno-Venus, de las mujeres del clan; Saturno-Marte, de hombres enérgicos; Saturno-Mercurio, de una fuente externa (escuela, institución, filosofía); Saturno-Urano, hasta 4 generaciones atrás; Saturno-Plutón, más allá.",
  },
  lilithQ:{
    posicion:"Leo · Casa 12",
    calculo:"Punto medio entre Lilith (Libra 20°48') y Quirón (Géminis 20°57'), resultando en Leo 20°52'. En casas iguales desde AC Virgo, cae en Casa 12.",
    definicion:"El punto medio Lilith-Quirón señala la parte psicológica y el área de vida donde expresamos la mayor sensación de fracaso existencial. Se percibe por las consecuencias de actitudes cristalizadas como «leyes mentira», que producen a la vez reacciones psicosomáticas. Nuestros puntos débiles a nivel corporal pueden apuntar a este punto medio.",
    circuito:"Toda creencia limitante sobre uno mismo se asocia a una herida y a una emoción repetitiva. Pudo formarse en la concepción o gestación y cristalizarse en el nacimiento, determinando sin darnos cuenta cómo afrontamos y nos relacionamos. El inconsciente proyecta dos posibilidades: seguir la ley mentira al pie de la letra, o sobrecompensarla.",
    antecedentes:"Posiblemente los programas familiares contienen una información de subordinación con un guion que atenta diciendo: «no pidas lo que necesitas, debes ascender por tus propios méritos». La atención de los padres no estuvo completamente centrada en el hijo/a. Pudo existir una separación de los padres antes de los 7 años, por lo que faltó dedicación de tiempo.",
    leyMentira:"«No soy importante.» «No soy valioso/a.»",
    sobrecompensacion:"Buscar cargos donde se toma el liderazgo, se ejecutan decisiones, se tiene autoridad. «Me toman en cuenta, me miran por mi físico, cómo visto, lo que hago, el talento que tengo.» Carisma camuflado de soberbia.",
    somatizacion:"Relacionado con el corazón. Vértebras dorsales. Músculos de la espalda. Hipersensibilidad cardiorrespiratoria.",
    leyEterna:"Autonomía. Conexión con la verdadera humildad. Recursos provechosos del ego, al servicio de la propia esencia y no de la mirada ajena.",
    experiencia:"Casa 12 (con matiz de Leo/Casa 5): el trabajo se hace en lo oculto, en lo que no se muestra. Se quiere enseñar lo mejor de uno mismo y expresar el propio potencial creativo, pero desde un lugar que a menudo permanece invisible. Trabajo de resolución sobre las expectativas heredadas y la necesidad de ser visto.",
    aspectos:"Sol · Júpiter · Marte · Plutón",
    sanacion:"El sendero sanador es aquello que, a través de la conexión con la propia esencia, permite mirar las veces que sea necesario las situaciones incómodas — hasta ser conscientes de la ley mentira, responsabilizarnos de ella y convertirla en ley eterna. Aquí: pasar de necesitar la mirada externa para sentirse valioso, a reconocer el propio valor desde dentro.",
  },
  casas:[
    {eje:"4–10",sig:"Padre – Madre",plan:"Urano, Neptuno, Juno / Luna, Quirón (MC)"},
    {eje:"1–7", sig:"Abuelos paternos",plan:"— / Júpiter, Vesta"},
    {eje:"3–9", sig:"Abuelos maternos",plan:"Sol, Mercurio, Venus, Saturno / —"},
    {eje:"11–5",sig:"Bisabuelos",plan:"— / Marte Acuario"},
  ],
  soma:[
    {s:"Escorpio",   n:5, sys:"Reproductivo · colon · inmune", foco:true},
    {s:"Sagitario",  n:3, sys:"Caderas · hígado", foco:false},
    {s:"Cáncer",     n:1, sys:"Estómago · pecho", foco:false},
    {s:"Capricornio",n:1, sys:"Huesos · articulaciones", foco:false},
  ],
  sintesis:{
    hilo:"La carta de Debora gira en torno a un núcleo escorpiano intenso: Sol, Mercurio, Venus, Plutón y Ceres concentrados en el signo, la mayoría en Casa 3 — el territorio del aprendizaje, la palabra y los hermanos. Aunque no forman conjunciones exactas entre sí, la carga escorpiana sitúa la profundidad, el poder y la transformación en el centro. Los aspectos que ordenan el mapa son el trígono Luna–Plutón (la fuerza del matriarcado), la cuadratura Marte–Plutón (las luchas de poder) y el quíncuncio Luna–Marte (cuidar frente a actuar). La memoria enfática Agua confirma este territorio de emociones profundas y secretos familiares; la ausencia de Tierra señala la falta de arraigo que el sistema busca reparar. El signo oculto en Piscis Casa 7 añade el amor idealizado como patrón invisible, y el mandato de Saturno en Sagitario–Casa 3 imprime la exigencia de encontrar un sentido propio frente a lo heredado.",
    ejes:[
      {t:"Poder y transformación del linaje", d:"El trígono Luna–Plutón y la carga escorpiana piden mirar qué historia de poder del matriarcado se regenera a través de ella, y cómo se expresa en la palabra y el vínculo con los hermanos (Casa 3). Poner la fuerza heredada al servicio, sin quedar atrapada en la intensidad.", col:"plum"},
      {t:"Poder y acción", d:"La cuadratura Marte–Plutón: revisar dónde la acción se vuelve lucha de poder — someterse o dominar. Canalizar la potencia para transformar en vez de imponer. La energía masculina del linaje pide integrarse.", col:"terra"},
      {t:"Falta de arraigo", d:"La ausencia de Tierra invita a buscar el cuerpo, lo concreto y las rutinas que arraiguen lo que el sistema dejó a medias. Terminar lo que los ancestros no terminaron.", col:"sage"},
      {t:"Mandato de sentido (Saturno)", d:"Saturno en Sagitario pide encontrar la propia verdad y el propio rumbo, separándose del mandato filosófico o de fe del linaje sin romper por ruptura.", col:"blue"},
    ],
    preguntas:[
      "¿Qué historia de poder o fuerza del linaje materno sientes que regeneras a través de ti?",
      "¿Dónde, en tu forma de actuar, la fuerza se convierte en lucha de poder — someterte o dominar?",
      "¿A quién representas cuando te enfadas? ¿Qué pasó con el enojo en tu familia?",
      "¿Qué creencia o mandato de sentido recibiste, y cuál sería tu propia verdad?",
    ],
    movimiento:"El movimiento reparador integra las capas: reconocer y honrar la fuerza regenerativa heredada del matriarcado (Luna–Plutón) sin quedar atrapada en la intensidad, canalizar la potencia de la acción para transformar en vez de imponer (Marte–Plutón), dar salida sana al enojo y a la energía masculina del linaje (Luna–Marte), arraigar en el cuerpo lo que el sistema dejó sin terminar, y elegir un sentido propio de vida. La consultante no tiene que rechazar la fuerza de su sistema — tiene que ponerla al servicio de su propia individuación.",
  },
  // ── ÓRDENES DEL AMOR (base: apuntes Enzo — Pertenencia/Jerarquía/Equilibrio) ──
  ordenes:{
    intro:"«Aparte del amor, aún se necesita algo más para que ese amor se logre: se requiere el conocimiento y el reconocimiento de un orden del amor que actúa en las profundidades del alma.» — Bert Hellinger. Los tres órdenes se leen en la carta a través de planetas concretos y sus aspectos.",
    pertenencia:{
      planeta:"Luna",
      glifo:"☽",
      titulo:"El derecho a un lugar",
      def:"La vinculación o pertenencia enseña que cada persona en una familia tiene derecho a pertenecer y a tener un lugar donde se le respete y reconozca su valor. La Luna simboliza los vínculos primarios, la contención psicológica y a quienes nos criaron. Habla de la madre y de las mujeres del linaje.",
      inclusionExclusion:"Los conflictos lunares muestran embrollos por la omisión de personas del clan. La inclusión permite la integración y lleva a la libertad; la exclusión (por un evento trágico, vergonzoso, una enfermedad) deja fuera a aquellos cuyos destinos no fueron aceptados. «De lo que no se habla pero se siente» describe la energía del excluido — que es quien tiene mayor fuerza en el clan y debe integrarse para que el patrón no se repita.",
      posicionDebora:"Luna en Cáncer · Casa 10",
      aspectoDebora:{
        nom:"Luna cuadratura Marte",
        txt:"La línea emocional hereditaria es competir y luchar. Suelen ser niños con mucha iniciativa que quieren hacerlo todo solos. Lo que no se expresa conecta con la rabia y puede provocar mal humor persistente o síntomas (cefaleas, úlceras, colon). La línea excluida tiende a ser la masculina, con conflictos de resentimiento. Cuento generacional típico: «hubo una vez un hombre muy malo en la familia», «cuando te enfadas me recuerdas a alguien». El trabajo: revisar qué pasó con el enojo y la energía masculina en el linaje.",
      },
    },
    jerarquia:{
      planeta:"Sol · Júpiter · Saturno",
      glifo:"☉",
      titulo:"El lugar que corresponde",
      def:"El respeto y la jerarquía tratan de ocupar el lugar que a cada quien le corresponde. No se trata de quién es el mejor, sino de quién llegó primero en el orden temporal. Quien sabe respetar la jerarquía tiene éxito en la vida. El Sol habla del reconocimiento de la vida otorgada por el padre; Júpiter, de la gratitud hacia quien nos enseña; Saturno, del respeto hacia lo establecido.",
      tresPlanetas:[
        {p:"Sol",r:"Reconocimiento ante la vida",d:"Cómo reconozco mi propia vida y cuánto necesito la aprobación externa. Casa y aspectos del Sol hablan de cómo percibí al padre."},
        {p:"Júpiter",r:"Gratitud hacia la vida",d:"El padre idealizado, lo inalcanzable, la figura optimista que me hubiera gustado tener. Cómo agradezco las oportunidades que llegan."},
        {p:"Saturno",r:"Respeto hacia la vida",d:"«Lo que tiene estructura prevalece.» El que respeta lo establecido recibe la bendición de aportar. La figura del que fue catalogado como tirano — rigor que hay que ejercer con más amor."},
      ],
      posicionDebora:"Sol · Mercurio · Saturno en Casa 3",
      aspectoDebora:{
        nom:"Marte sextil Saturno · Luna quíncuncio Saturno",
        txt:"Saturno está muy presente en el eje de la jerarquía. El sextil Marte–Saturno ofrece un recurso: la capacidad de disciplinar la acción y sostener el esfuerzo, heredada de los abuelos. Pero el quíncuncio Luna–Saturno introduce el peso del deber: la obligación de hacerse cargo de la familia, la memoria de una abuela rígida, la dificultad de expresar las emociones. El trabajo es honrar la estructura heredada y usar la disciplina disponible, sin cargar con mandatos de deber que no son propios ni quedar atrapada en la soledad emocional del linaje.",
      },
    },
    equilibrio:{
      planeta:"Marte · Venus",
      glifo:"♀",
      titulo:"El dar y el recibir",
      def:"Cuando se respetan la pertenencia y la jerarquía, llega el equilibrio entre el dar (Marte) y el recibir (Venus). El que da demasiado amenaza la relación y coloca al otro en deuda; el que solo toma se llena de culpa y desarrolla dependencias. «No debo dar más de lo que el otro me puede devolver» — Hellinger.",
      desequilibrios:[
        {t:"Dar en exceso (Marte)",d:"Quien recibe se siente en deuda, incapaz de sentirse par, valioso o aportador. Se da desde una postura de poder que obliga al otro."},
        {t:"Recibir en exceso (Venus)",d:"Tomar en demasía sin devolver llena de culpa y tiende a crear dependencias afectivas."},
      ],
      posicionDebora:"Venus en Escorpio · Casa 3 ℞ / Marte en Acuario · Casa 5",
      aspectoDebora:{
        nom:"Marte cuadratura Plutón",
        txt:"El conflicto del equilibrio se lee aquí en la cuadratura Marte–Plutón: la acción (dar) choca con fuerzas de poder profundas. Luchas de dominación y sometimiento heredadas, donde dar o recibir se vuelve cuestión de fuerza. Con Venus retrógrada en Escorpio, el recibir queda además ligado a la intensidad y al miedo a la pérdida — riesgo de vínculos simbióticos donde se necesita ser indispensable. El trabajo es soltar el control como forma de amor, canalizar la potencia para transformar en vez de imponer, y aprender a recibir sin aferrarse.",
      },
    },
  },
  // Tipos de aspecto — movimiento sistémico (base 03A de Enzo De Paola)
  tiposAspecto:{
    "conjunción":{mov:"Fusión",sym:"☌",desc:"No hay distancia entre los arquetipos implicados.",din:"Fusión e identificación entre energías.",preg:"¿Dónde no hay separación posible y me confundo con el otro?",riesgo:"Puede anular la diferenciación.",col:"conj"},
    "sextil":{mov:"Oportunidad",sym:"⚹",desc:"Talento disponible que puede estancarse si no se activa conscientemente.",din:"Acceso facilitado a una energía.",preg:"¿Cómo puedo usar este recurso sin acomodarme o bloquear el flujo?",riesgo:"Pacto invisible.",col:"harm"},
    "trígono":{mov:"Fluidez",sym:"△",desc:"Facilidad heredada que puede convertirse en zona ciega.",din:"Fluidez excesiva y zona cómoda.",preg:"¿Dónde me acomodo y dejo de crecer por exceso de facilidad?",riesgo:"Estancamiento sistémico.",col:"harm"},
    "cuadratura":{mov:"Fricción",sym:"□",desc:"Retos repetidos, luchas y conflictos no resueltos en el sistema familiar.",din:"Fricción activa y desafío heredado.",preg:"¿Cómo acepto este desafío sin quedarme atrapado en la lucha?",riesgo:"Repetición de conflicto.",col:"tens"},
    "oposición":{mov:"Polarización",sym:"☍",desc:"Conflicto entre dos polos opuestos que buscan integración.",din:"Polaridad y tensión relacional.",preg:"¿Cómo puedo integrar estos dos extremos sin excluir ninguno?",riesgo:"Proyección y conflicto relacional.",col:"tens"},
    "quíncuncio":{mov:"Reajuste",sym:"⚻",desc:"Incomodidad persistente que obliga a modificar actitudes.",din:"Desajuste interno que exige reajuste.",preg:"¿Qué necesito reajustar para recuperar el equilibrio?",riesgo:"Desgaste por incomodidad crónica.",col:"quin"},
  },
  // Aspectos de la carta con interpretación sistémica (base 03B) — aspectos REALES por orbe
  aspectos:[
    {
      p1:"Luna", g1:"☽", p2:"Plutón", g2:"♇", tipo:"trígono", orbe:"Cáncer C10 – Escorpio C2 · orbe 1.5°",
      tema:"Flujo entre la emoción y el poder heredado",
      conflicto:"La intensidad y el drama como ingredientes de la vinculación familiar. Algo se esconde, se mantiene guardado. La línea predominante es el matriarcado: las mujeres tomaron el bastión de la familia.",
      emocion:"Profundidad emocional, magnetismo, conexión con lo oculto y lo místico del linaje femenino.",
      adulta:"Recurso heredado de fuerza regenerativa: capacidad de sostener procesos intensos de transformación. La madre pudo vivirse como fuente de resiliencia — «gracias a mi madre soy lo que soy».",
      repeticion:"Como es un trígono, el recurso fluye pero puede volverse zona ciega: la intensidad se da por sentada. Riesgo de vínculos simbióticos si no se activa conscientemente.",
      pregunta:"¿Cómo pongo esta fuerza regenerativa heredada al servicio de mi vida, sin quedar atrapada en la intensidad?",
      orden:"Pertenencia",
      focoDebora:true,
    },
    {
      p1:"Marte", g1:"♂", p2:"Plutón", g2:"♇", tipo:"cuadratura", orbe:"Acuario C5 – Escorpio C2 · orbe 2.2°",
      tema:"Fricción entre la acción y el poder",
      conflicto:"Luchas de poder heredadas donde la acción choca con fuerzas de control profundas. Conflictos de dominación y sometimiento en el sistema.",
      emocion:"Rabia intensa, deseo de control, energía que puede volverse destructiva o transformadora.",
      adulta:"Fuerza de voluntad enorme; capacidad de acción radical y regeneración. Riesgo de imponer o de vivir la propia potencia como amenaza.",
      repeticion:"Situaciones de poder que se repiten como pulsos: someterse o dominar. La energía masculina del linaje pide ser canalizada.",
      pregunta:"¿Cómo uso mi fuerza para transformar en vez de para imponer o destruir?",
      orden:"Equilibrio",
      focoDebora:true,
    },
    {
      p1:"Luna", g1:"☽", p2:"Marte", g2:"♂", tipo:"quíncuncio", orbe:"Cáncer C10 – Acuario C5 · orbe 0.7°",
      tema:"Reajuste entre cuidar y actuar en libertad",
      conflicto:"La línea emocional hereditaria es competir y luchar. Lo que no se expresa conecta con la rabia. La línea excluida tiende a ser la masculina, con conflictos de resentimiento.",
      emocion:"Enfado, irritabilidad, mal humor persistente cuando la rabia no encuentra salida.",
      adulta:"Mucha iniciativa, querer hacerlo todo sola. Tensión entre el rol de cuidadora y la necesidad de autonomía y acción.",
      repeticion:"Reacciones impulsivas o rabia reprimida que somatiza (cefaleas, colon). Cuento generacional: «hubo un hombre muy malo», «cuando te enfadas me recuerdas a alguien».",
      pregunta:"¿A quién represento cuando me enfado? ¿Qué pasó con el enojo y la energía masculina en mi linaje?",
      orden:"Pertenencia",
      focoDebora:true,
    },
    {
      p1:"Sol", g1:"☉", p2:"Mercurio", g2:"☿", tipo:"conjunción", orbe:"Escorpio C3 · orbe 3.0°",
      tema:"Identidad fundida con la mente y la palabra",
      conflicto:"La identidad ligada a ser escuchada y a comunicar. El padre como figura intelectual o comunicadora en el sistema.",
      emocion:"Orgullo mental, ego herido si no se la escucha o valida su pensamiento.",
      adulta:"Fuerte capacidad de comunicación y pensamiento independiente; la palabra como territorio de identidad (ambos en Casa 3).",
      repeticion:"Necesidad de tomar un papel activo en la comunicación para sentir que existe.",
      pregunta:"¿Necesito ser escuchada para sentir que soy?",
      orden:"Jerarquía",
      focoDebora:false,
    },
    {
      p1:"Sol", g1:"☉", p2:"Venus", g2:"♀", tipo:"conjunción", orbe:"Escorpio C3 · orbe 3.8°",
      tema:"Identidad fundida con el valor y lo afectivo",
      conflicto:"El merecimiento y el amor propio ligados a la mirada del padre y al linaje femenino (Venus).",
      emocion:"Búsqueda de armonía y valoración; temor al rechazo.",
      adulta:"Yo creativo y afectivo; capacidad de agradar. Puede dudar de su propia valía o supeditarla a ser amada.",
      repeticion:"Buscar la aprobación afectiva para sostener la identidad.",
      pregunta:"¿Qué parte de mi valor depende de ser amada?",
      orden:"Equilibrio",
      focoDebora:false,
    },
    {
      p1:"Marte", g1:"♂", p2:"Saturno", g2:"♄", tipo:"sextil", orbe:"Acuario C5 – Sagitario C3 · orbe 1.7°",
      tema:"Oportunidad de acción estructurada",
      conflicto:"Recurso heredado: la capacidad de disciplinar la acción, de sostener el esfuerzo. Nos habla de los abuelos y de lo que vivieron en su juventud.",
      emocion:"Determinación, resistencia, capacidad de trabajo sostenido.",
      adulta:"Talento disponible para construir con constancia y canalizar la energía hacia metas de largo plazo — si se activa conscientemente.",
      repeticion:"Como sextil, es una puerta abierta que puede estancarse: la disciplina está disponible pero requiere elegirla.",
      pregunta:"¿Cómo activo esta capacidad de acción sostenida en lugar de dejarla dormida?",
      orden:"Jerarquía",
      focoDebora:false,
    },
    {
      p1:"Luna", g1:"☽", p2:"Saturno", g2:"♄", tipo:"quíncuncio", orbe:"Cáncer C10 – Sagitario C3 · orbe 1.0°",
      tema:"Reajuste entre la emoción y el deber",
      conflicto:"La línea emocional hereditaria tiende a la limitación y la culpa: la obligación de hacerse cargo de la familia. La memoria proviene de la figura de una abuela del sistema.",
      emocion:"Sensación de soledad, dificultad para expresar emociones, peso del deber.",
      adulta:"Tener que hacerse cargo de algo del sistema que no se quiere asumir. Rigidez emocional heredada de la línea de la abuela.",
      repeticion:"Cuento generacional: «era rígida», «murió sola y seca», «le faltó expresar las emociones».",
      pregunta:"¿Qué lealtad tengo con mi abuela? ¿Me siento sola por un mandato que no es mío?",
      orden:"Pertenencia",
      focoDebora:false,
    },
    {
      p1:"Urano", g1:"♅", p2:"Quirón", g2:"⚷", tipo:"oposición", orbe:"Sagitario C4 – Géminis C10 · orbe 1.2°",
      tema:"Polarización entre la ruptura y la herida",
      conflicto:"Tensión entre el impulso de romper con lo establecido (Urano) y la herida de exclusión o rechazo (Quirón). El linaje porta a la vez la ruptura y la cicatriz.",
      emocion:"Sensación de no encajar, de ser diferente; la herida de sentirse fuera.",
      adulta:"Oscilación entre afirmar la propia diferencia y sentir el dolor del rechazo. La oveja negra que a la vez sana y se hiere.",
      repeticion:"Rupturas bruscas seguidas de la herida de la exclusión; el patrón de quedarse fuera para poder ser distinta.",
      pregunta:"¿Cómo integro mi originalidad sin necesitar ser excluida para expresarla?",
      orden:"Pertenencia",
      focoDebora:false,
    },
    {
      p1:"Neptuno", g1:"♆", p2:"Plutón", g2:"♇", tipo:"sextil", orbe:"Capricornio C4 – Escorpio C2 · orbe 3.6°",
      tema:"Oportunidad de transformación profunda y sensible",
      conflicto:"Recurso generacional: capacidad de regenerar desde lo sutil y lo compasivo. Compartido por toda una generación.",
      emocion:"Intuición profunda, sensibilidad hacia lo invisible y lo colectivo.",
      adulta:"Talento para acompañar procesos de transformación y sanación; disponible si se activa conscientemente.",
      repeticion:"Recurso que se estanca si no se pone al servicio de forma deliberada.",
      pregunta:"¿Cómo activo este don de transformación en lugar de dejarlo dormido?",
      orden:"Equilibrio",
      focoDebora:false,
    },
    {
      p1:"Luna", g1:"☽", p2:"Neptuno", g2:"♆", tipo:"oposición", orbe:"Cáncer C10 – Capricornio C4 · orbe 5.1°",
      tema:"Polarización entre la contención y la disolución",
      conflicto:"El tema raíz puede provenir de la identidad en el entorno familiar: embrollos de nacionalidad, ancestros que huyeron o vivieron situaciones no claras. La contención materna se vuelve difusa, como una neblina.",
      emocion:"Sensación de no pertenecer, de estar perdida, de no encontrar la contención de la Luna.",
      adulta:"Gran sensibilidad y compasión, pero con riesgo de sentirse desdibujada o de idealizar la figura materna.",
      repeticion:"Sentir que no encaja en la propia familia; buscar contención en lo que se disuelve. Riesgo de patrones de evasión.",
      pregunta:"¿Dónde busco la contención que sentí que me faltó, y cómo la encuentro dentro de mí?",
      orden:"Pertenencia",
      focoDebora:false,
    },
  ],
  esferas:[
    {id:"sol",  num:"1",  nombre:"Sol",      planeta:"☉", colorHex:"#D4724A", colorName:"Naranja",     rep:"Fuerza de expresión de la vida, energía del padre, estructura egoica. Integrador del ego, reconocimiento sistémico y voluntad personal.", cli:"Búsqueda de merecimiento, la mirada no encontrada del padre. Sobrevaloración con comportamientos arrogantes. Propósito: recuperar el sentido de la dignidad."},
    {id:"luna", num:"2",  nombre:"Luna",     planeta:"☽", colorHex:"#B8B8C8", colorName:"Blanco",      rep:"Transparencia, inocencia, pureza del vientre, energía materna. Instinto de protección, paz. Liberador de sensaciones de abandono.", cli:"Exagerada sensibilidad, sensaciones de abandono. Asunto pendiente con la madre o figura dominante. Experiencias de la primera infancia sin resolver."},
    {id:"merc", num:"3",  nombre:"Mercurio", planeta:"☿", colorHex:"#C8A830", colorName:"Amarillo",    rep:"Alegría juvenil, expresión, jugar a vivir. Hermanos, compañeros, vecinos. Área intelectual, mental y comunicación.", cli:"Inquietudes mentales, indecisión, muchas ideas sin concretar. Posible escolarización inconclusa. Conflictos de comunicación: no se entiende o cree que no le entienden."},
    {id:"venus",num:"4",  nombre:"Venus",    planeta:"♀", colorHex:"#4A8C5C", colorName:"Verde",       rep:"Afinidad con la naturaleza, relaciones, lo femenino, linaje de las mujeres, belleza, fertilidad. Orienta hacia la paz interior y la equidad.", cli:"Sensualidad vs sexualidad, valoración vs vanidad. Conflicto con el linaje femenino. Creencias amorosas como punto de mira para sanar."},
    {id:"marte",num:"5",  nombre:"Marte",    planeta:"♂", colorHex:"#B83030", colorName:"Rojo",        rep:"Fuerza vital, poder de acción, energía de los hombres del sistema. Sana la desconfianza, genera motivación y coraje.", cli:"La rabia como emoción primaria, irritabilidad, agresividad. Búsqueda en el linaje masculino. Deseo de emprendimiento y autoafirmación."},
    {id:"jup",  num:"6",  nombre:"Júpiter",  planeta:"♃", colorHex:"#4A90C8", colorName:"Azul celeste",rep:"Mente elevada, conocimiento superior, claridad de ideas. Expansión, tranquilidad del espíritu. Generosidad, abundancia, fe y verdad.", cli:"Necesidad de ampliar el espacio. Figura heroica admirada. Delirios de grandeza o desborde emocional. La fe como camino de reencuentro."},
    {id:"sat",  num:"7",  nombre:"Saturno",  planeta:"♄", colorHex:"#404040", colorName:"Negro",       rep:"Responsabilidad, sobriedad y rigidez. Silencio, respeto, guardar distancias con la autoridad. Orden y estructura lineal.", cli:"Impedimentos, aislamiento por miedos, vergüenza sin honra. Lealtad invisible con la historia de un abuelo. Sanar: orden interior y confianza hacia la vida."},
    {id:"urano",num:"8",  nombre:"Urano",    planeta:"♅", colorHex:"#9098A8", colorName:"Plateado",    rep:"Razón y creatividad brillante, los bisabuelos. Conexión con lo diferente. Armoniza y produce limpiezas interiores, independencia.", cli:"Romper con condiciones establecidas. Genialidad y marcar diferencias. Fidelidad con la cuarta generación o exclusión. Potenciar el papel de oveja negra."},
    {id:"nept", num:"9",  nombre:"Neptuno",  planeta:"♆", colorHex:"#1C3060", colorName:"Azul oscuro", rep:"Amor universal y profundo. Conexión femenina, intuitiva y psíquica. Fuente del servicio humanístico, lealtad con las víctimas.", cli:"Autoengaño, confusión, pérdida de identidad, evasión. Energía marginada en el sistema familiar. Aprender a tratarse con respeto y autocomprensión."},
    {id:"plut", num:"10", nombre:"Plutón",   planeta:"♇", colorHex:"#6A0820", colorName:"Vinotinto",   rep:"Transformación profunda, capa superficial y otra secreta. Activa instintos y fuerza de regeneración. Poder, magia, sexualidad. Riqueza interior.", cli:"Miedo a perder la propia voluntad. Tendencias autodestructivas como ecos del pasado. Sanar: asumir el propio destino comprendiendo que nada es bueno o malo."},
    {id:"quir", num:"11", nombre:"Quirón",   planeta:"⚷", colorHex:"#7040A0", colorName:"Violeta",     rep:"Despertador del inconsciente muy poderoso. Equilibrador psíquico. Libera procesos de miedos, rechazos y obsesiones.", cli:"Síndrome del impostor, autorrechazo y vergüenza. Herida de abandono, pérdida y humillación propia o transgeneracional. Sanar: mirar la herida y aceptarla."},
    {id:"lilith",num:"12",nombre:"Lilith",   planeta:"⚸", colorHex:"#3A1010", colorName:"Rojinegro",   rep:"Manifestación de la inconformidad, lo igualitario, la fuerza y el respeto. Desinhibidor terapéutico que aporta equilibrio al ser integrado.", cli:"Conducta anárquica y autoexcluyente. Sentimiento de justicia permanente por lo que le aconteció a un ancestro. Enfado reprimido que busca reparar lo que no puede interpretar."},
  ],
};

// ── PALETTE ───────────────────────────────────────────────────────────────────
const C = {
  bg:       "#F0EEEB",   // gris cálido, como papel
  bg2:      "#FAFAF8",   // blanco roto — surface
  bg3:      "#EDECEA",   // hundido
  border:   "rgba(0,0,0,0.08)",
  borderMd: "rgba(0,0,0,0.13)",
  text:     "#18161A",   // casi negro
  sub:      "#5C5868",   // gris medio
  muted:    "#9A96A4",   // gris claro
  plum:     "#3D2B4A",   // ciruela — acento principal
  plumSoft: "rgba(61,43,74,0.08)",
  terra:    "#C4856A",   // terracota pálida
  terraSoft:"rgba(196,133,106,0.1)",
  sage:     "#7A9E8A",   // verde salvia
  blue:     "#7090B8",   // azul apagado
};

// ── NATAL WHEEL ──────────────────────────────────────────────────────────────
function NatalWheel({ size = 500 }) {
  const cx = size / 2, cy = size / 2;

  // Paleta pastel de aspectos
  const C_HARM = "#7090B8";   // azul apagado — armónicos (trígono, sextil)
  const C_TENS = "#C4856A";   // terracota pálida — tensos (cuadratura, oposición)
  const C_CONJ = "#8B7A96";   // plum tenue — conjunción
  const C_QUIN = "#A0A0A8";   // gris — quincuncio

  // Colores de elemento (pastel) para glifos de signo
  const EL = {
    fuego: "#C4856A",  // terracota
    tierra:"#7A9E8A",  // sage
    aire:  "#A89878",  // ocre suave
    agua:  "#7090B8",  // azul
  };
  const SIGN_EL = ["fuego","tierra","aire","agua","fuego","tierra","aire","agua","fuego","tierra","aire","agua"];

  // Radios — planetas DENTRO del anillo zodiacal (estilo referencia)
  const Rzod  = size * .430;  // borde ext del anillo zodiacal
  const Rzi   = size * .372;  // borde int del anillo zodiacal
  const Rpl   = size * .330;  // banda de planetas (etiqueta apilada vertical)
  const Rhco  = size * .222;  // borde EXTERIOR del anillo de casas
  const Rhc   = size * .200;  // radio donde vive el número de casa (centro del anillo)
  const Rhci  = size * .178;  // borde INTERIOR del anillo de casas
  const Rasp  = size * .178;  // círculo interior de aspectos (= borde int casas)
  const Rcen  = size * .022;  // centro

  const toRad = d => ((d - 90) * Math.PI) / 180;

  // ── ROTACIÓN DE LA RUEDA ──
  // En una carta natal el AC va a la IZQUIERDA (9 en punto) y los grados del zodíaco
  // crecen en sentido ANTIHORARIO. Mantenemos el sistema de pantalla estándar
  // (0°=arriba, horario) pero transformamos el grado zodiacal a un "grado de dibujo":
  //   drawDeg = 90 - (d - AC_DEG)   → AC queda a la izquierda, zodíaco antihorario.
  const AC_DEG = 159.74;   // Virgo 9°44'
  const MC_DEG = 66.37;    // Géminis 6°22'
  const zdraw = (d) => 270 - (d - AC_DEG);          // grado zodiacal → grado de dibujo (pantalla)
  const pt = (r, d) => {                             // d = grado zodiacal absoluto
    const dd = zdraw(d);
    return { x: cx + r * Math.cos(toRad(dd)), y: cy + r * Math.sin(toRad(dd)) };
  };
  // ptScreen: para elementos anclados a la pantalla por grado de dibujo directo (ejes fijos)
  const ptS = (r, drawDeg) => ({ x: cx + r * Math.cos(toRad(drawDeg)), y: cy + r * Math.sin(toRad(drawDeg)) });

  // Casas iguales desde el AC. Cúspide de casa n en grado zodiacal:
  const casaCuspDeg = (n) => AC_DEG - (n - 1) * 30;
  const casaMidDeg  = (n) => AC_DEG - (n - 1) * 30 - 15;

  const INK  = "#3A3644";
  const INK2 = "#5C5868";
  const INK3 = "#9A96A4";
  const HAIR = "rgba(58,54,68,0.55)";

  const SIGNS = [
    "\u2648\uFE0E","\u2649\uFE0E","\u264A\uFE0E","\u264B\uFE0E","\u264C\uFE0E","\u264D\uFE0E",
    "\u264E\uFE0E","\u264F\uFE0E","\u2650\uFE0E","\u2651\uFE0E","\u2652\uFE0E","\u2653\uFE0E"
  ];

  // Planetas de Debora — deg = grado zodiacal absoluto (0=Aries 0°)
  const PLANETS = [
    { g:"\u2609\uFE0E", label:"Sol",      deg:232.42, gr:"22", min:"25", r:false },
    { g:"\u263D\uFE0E", label:"Luna",     deg:98.60,  gr:"08", min:"36", r:false },
    { g:"\u263F\uFE0E", label:"Mercurio", deg:235.38, gr:"25", min:"23", r:false },
    { g:"\u2640\uFE0E", label:"Venus",    deg:228.62, gr:"18", min:"37", r:true  },
    { g:"\u2642\uFE0E", label:"Marte",    deg:309.30, gr:"09", min:"18", r:false },
    { g:"\u2643\uFE0E", label:"J\u00fapiter",  deg:343.32, gr:"13", min:"19", r:true  },
    { g:"\u2644\uFE0E", label:"Saturno",  deg:247.60, gr:"07", min:"36", r:false },
    { g:"\u2645\uFE0E", label:"Urano",    deg:259.73, gr:"19", min:"44", r:false },
    { g:"\u2646\uFE0E", label:"Neptuno",  deg:273.47, gr:"03", min:"28", r:false },
    { g:"\u2647\uFE0E", label:"Plut\u00f3n",   deg:217.05, gr:"07", min:"03", r:false },
    { g:"\u260A\uFE0E", label:"Nodo N.",  deg:20.80,  gr:"20", min:"48", r:false },
    { g:"\u26B7\uFE0E", label:"Quir\u00f3n",   deg:80.95,  gr:"20", min:"57", r:true  },
    { g:"\u26B8\uFE0E", label:"Lilith",   deg:200.80, gr:"20", min:"48", r:false },
    { g:"\u26B3\uFE0E", label:"Ceres",    deg:216.02, gr:"06", min:"01", r:false },
    { g:"\u26B4\uFE0E", label:"Palas",    deg:194.67, gr:"14", min:"40", r:false },
    { g:"\u26B5\uFE0E", label:"Juno",     deg:257.60, gr:"17", min:"36", r:false },
    { g:"\u26B6\uFE0E", label:"Vesta",    deg:4.75,   gr:"04", min:"45", r:true  },
  ];

  // Signo de cada planeta a partir del grado absoluto
  const signIdx = deg => Math.floor(((deg % 360) + 360) % 360 / 30);

  // Escalonado radial: cada planeta lleva su etiqueta individual orientada al radio.
  // Cuando dos planetas están muy juntos angularmente, se colocan a distinto radio
  // (uno más adentro, otro más afuera) para que no se solapen — como carta-natal.es.
  const CLUSTER_GAP = 9;   // grados: umbral de proximidad
  const placedPlanets = (() => {
    const sorted = [...PLANETS].map((p,i)=>({...p, i, sign:signIdx(p.deg)}))
      .sort((a,b)=>a.deg-b.deg);
    // detectar grupos de proximidad
    const groups = [];
    let cur = [sorted[0]];
    for (let k=1;k<sorted.length;k++){
      if (sorted[k].deg - sorted[k-1].deg <= CLUSTER_GAP) cur.push(sorted[k]);
      else { groups.push(cur); cur=[sorted[k]]; }
    }
    groups.push(cur);
    if (groups.length>1){
      const first=groups[0], last=groups[groups.length-1];
      if ((first[0].deg+360)-last[last.length-1].deg <= CLUSTER_GAP){
        groups[0]=last.concat(first); groups.pop();
      }
    }
    // asignar nivel radial a cada planeta dentro de su grupo (escalonado hacia dentro)
    const out = [];
    groups.forEach(grp=>{
      grp.forEach((p,idx)=>{
        out.push({ ...p, level: idx, groupSize: grp.length });
      });
    });
    return out;
  })();



  // Aspectos entre todos los pares
  const calcAsp = (a, b) => {
    let d = Math.abs(a - b); if (d > 180) d = 360 - d;
    if (d <= 9)               return "con";
    if (Math.abs(d - 60)  <= 5) return "sex";
    if (Math.abs(d - 90)  <= 7) return "cua";
    if (Math.abs(d - 120) <= 7) return "tri";
    if (Math.abs(d - 150) <= 3) return "qui";
    if (Math.abs(d - 180) <= 9) return "opp";
    return null;
  };

  const ASPECTS = [];
  for (let i = 0; i < PLANETS.length; i++) {
    for (let j = i + 1; j < PLANETS.length; j++) {
      const t = calcAsp(PLANETS[i].deg, PLANETS[j].deg);
      if (t) ASPECTS.push({ a: PLANETS[i].deg, b: PLANETS[j].deg, t });
    }
  }

  // Estilo de aspecto — dos colores pastel como la referencia
  const ASP_S = {
    con: { col: C_CONJ, dash: "none", w: ".8" },
    tri: { col: C_HARM, dash: "none", w: ".7" },
    sex: { col: C_HARM, dash: "none", w: ".5" },
    cua: { col: C_TENS, dash: "none", w: ".7" },
    opp: { col: C_TENS, dash: "none", w: ".8" },
    qui: { col: C_QUIN, dash: "2.5,2", w: ".45" },
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size, display: "block", margin: "0 auto" }}
    >
      {/* Fondo */}
      <circle cx={cx} cy={cy} r={Rzod + 2} fill={C.bg2} stroke="none" />

      {/* Anillos zodiacales (sin círculo exterior de ticks) */}
      <circle cx={cx} cy={cy} r={Rzod} fill="none" stroke={INK} strokeWidth=".9" />
      <circle cx={cx} cy={cy} r={Rzi}  fill="none" stroke={INK} strokeWidth=".9" />

      {/* Sectores de signo con relleno pastel muy suave por elemento */}
      {Array.from({ length: 12 }, (_, i) => {
        const d1 = i*30, d2 = d1+30;
        const s1 = pt(Rzod, d1), e1 = pt(Rzod, d2);
        const s2 = pt(Rzi, d2),  e2 = pt(Rzi, d1);
        const el = SIGN_EL[i];
        return (
          <path key={i}
            d={`M ${s1.x} ${s1.y} A ${Rzod} ${Rzod} 0 0 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${Rzi} ${Rzi} 0 0 0 ${e2.x} ${e2.y} Z`}
            fill={EL[el]} opacity=".07" stroke="none" />
        );
      })}

      {/* Divisiones de signo */}
      {Array.from({ length: 12 }, (_, i) => {
        const p1 = pt(Rzod, i * 30), p2 = pt(Rzi, i * 30);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={INK} strokeWidth=".8" opacity=".85" />;
      })}

      {/* Graduación densa en la CARA INTERIOR del anillo zodiacal (grados + minutos) */}
      {Array.from({ length: 360 }, (_, i) => {
        const isSign = i % 30 === 0;                       // división de signo (ya dibujada aparte)
        if (isSign) return null;
        const isDec  = i % 10 === 0;                       // cada 10°: marca más larga
        const isFive = i % 5 === 0 && !isDec;              // cada 5°: media
        const h = isDec ? size*.018 : isFive ? size*.012 : size*.007;   // grado normal más corto
        const p1 = pt(Rzi, i), p2 = pt(Rzi + h, i);
        return (
          <line key={`d${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={INK}
            strokeWidth={isDec ? ".5" : isFive ? ".38" : ".28"}
            opacity={isDec ? ".6" : isFive ? ".45" : ".32"} />
        );
      })}
      {/* Marcas finas de minutos: subdividen cada grado en tramos pequeños */}
      {Array.from({ length: 360 }, (_, deg) => {
        // 4 marcas de minuto por grado (cada 15') — muy finas y cortas
        return [1,2,3].map((k) => {
          const a = deg + k * 0.25;
          const p1 = pt(Rzi, a), p2 = pt(Rzi + size*.004, a);
          return (
            <line key={`m${deg}-${k}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={INK} strokeWidth=".18" opacity=".22" />
          );
        });
      })}

      {/* Glifos zodiacales coloreados por elemento */}
      {SIGNS.map((g, i) => {
        const mid = pt((Rzod + Rzi) / 2, i * 30 + 15);
        return (
          <text key={i}
            x={mid.x} y={mid.y + .5}
            textAnchor="middle" dominantBaseline="central"
            fontFamily="'Noto Sans Symbols 2','Apple Symbols','Segoe UI Symbol',serif"
            fontSize={size * .036} fill={EL[SIGN_EL[i]]}
            style={{ fontVariantEmoji: "text" }}>
            {g}
          </text>
        );
      })}

      {/* Interior */}
      <circle cx={cx} cy={cy} r={Rzi} fill={C.bg2} stroke="none" />

      {/* Líneas de cúspide largas (ejes) desde el zodíaco hasta el anillo de casas */}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const isMaj = (n === 1 || n === 4 || n === 7 || n === 10);  // ejes AC/IC/DC/MC
        const cusp = casaCuspDeg(n);
        const p1 = pt(Rzi, cusp), p2 = pt(Rhco, cusp);
        return (
          <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={INK}
            strokeWidth={isMaj ? ".8" : ".4"}
            opacity={isMaj ? ".55" : ".28"} />
        );
      })}

      {/* ── ANILLO DE CASAS ── */}
      <circle cx={cx} cy={cy} r={Rhco} fill={C.bg2} stroke={INK} strokeWidth=".7" opacity=".55" />
      <circle cx={cx} cy={cy} r={Rhci} fill={C.bg2} stroke={INK} strokeWidth=".7" opacity=".55" />
      {/* Divisiones de las 12 casas dentro del anillo */}
      {Array.from({ length: 12 }, (_, i) => {
        const cusp = casaCuspDeg(i + 1);
        const p1 = pt(Rhco, cusp), p2 = pt(Rhci, cusp);
        return (
          <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={INK} strokeWidth=".55" opacity=".5" />
        );
      })}
      {/* Números de casa viviendo dentro del anillo */}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const pos = pt(Rhc, casaMidDeg(n));
        return (
          <text key={i}
            x={pos.x} y={pos.y + .5}
            textAnchor="middle" dominantBaseline="central"
            fontFamily="Inter,sans-serif"
            fontSize={size * .024} fill={INK2} fontWeight="600" opacity=".8">
            {n}
          </text>
        );
      })}

      {/* Círculo interior — límite de la red de aspectos */}
      <circle cx={cx} cy={cy} r={Rasp} fill={C.bg2} stroke={INK} strokeWidth=".6" opacity=".45" />

      {/* Red de aspectos en dos colores pastel */}
      {ASPECTS.map((asp, i) => {
        const p1 = pt(Rasp - 1, asp.a);
        const p2 = pt(Rasp - 1, asp.b);
        const s  = ASP_S[asp.t] || ASP_S.sex;
        return (
          <line key={i}
            x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={s.col} strokeWidth={s.w}
            strokeDasharray={s.dash}
            opacity=".7"
          />
        );
      })}

      {/* Ejes AC/DC/MC/IC — línea interior + etiqueta FUERA del anillo zodiacal */}
      {[{ l:"AC", d:AC_DEG }, { l:"DC", d:AC_DEG+180 }, { l:"MC", d:MC_DEG }, { l:"IC", d:MC_DEG+180 }].map(({ l, d }) => {
        const p1 = pt(Rasp, d), p2 = pt(Rzi, d);
        const tp = pt(Rzod + size * .034, d);
        return (
          <g key={l}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={C.plum} strokeWidth="1.1" opacity=".8" />
            <text x={tp.x} y={tp.y}
              textAnchor="middle" dominantBaseline="central"
              fontFamily="Inter,sans-serif"
              fontSize={size * .022} fontWeight="700" fill={C.plum}>
              {l}
            </text>
          </g>
        );
      })}

      {/* Planetas — bloque vertical (glifo/grado/minuto/signo) rotado según su ángulo en el círculo */}
      {placedPlanets.map((pl, i) => {
        // Grado de dibujo (pantalla) tras la rotación de la rueda
        const dd = zdraw(pl.deg);
        // Separación tangencial del cúmulo para no solaparse
        const spreadStep = size * .052;
        const offset = (pl.level - (pl.groupSize - 1) / 2) * spreadStep;
        const ang = toRad(dd);
        const tnx = -Math.sin(ang), tny = Math.cos(ang);
        const rBase = Rpl + size * .008;
        const base = pt(rBase, pl.deg);
        const ax = base.x + tnx * offset;
        const ay = base.y + tny * offset;

        // Ángulo de rotación del bloque: se alinea con el radio (grado de dibujo).
        // En la mitad inferior de la pantalla volteamos 180° para que no quede cabeza abajo.
        const ddn = ((dd % 360) + 360) % 360;
        const flip = (ddn > 90 && ddn < 270);
        const rot = flip ? dd + 180 : dd;

        // Líneas apiladas (en coords locales, y hacia "abajo" = hacia el centro)
        const lineH = size * .026;
        // Si va volteado, el orden vertical se invierte para que glifo quede hacia fuera
        const dir = flip ? -1 : 1;
        const yG = 0;
        const yD = dir * lineH;
        const yM = dir * lineH * 2;
        const yS = dir * lineH * 3;

        // Tick radial de posición exacta
        const tk1 = pt(Rzi - 1, pl.deg);
        const tk2 = pt(Rzi - size * .020, pl.deg);
        const lk1 = pt(Rzi - size * .022, pl.deg);

        return (
          <g key={`pl${i}`}>
            {/* Tick de posición exacta */}
            <line x1={tk1.x} y1={tk1.y} x2={tk2.x} y2={tk2.y}
              stroke={INK2} strokeWidth=".9" opacity=".7" />
            {/* Hilo conector si está desplazado */}
            {Math.abs(offset) > 0.5 && (
              <line x1={lk1.x} y1={lk1.y} x2={ax} y2={ay - (flip?-1:1)*lineH*.6}
                stroke={INK3} strokeWidth=".35" opacity=".4" strokeDasharray="1.5,2" />
            )}
            {/* Bloque rotado según el ángulo del planeta */}
            <g transform={`translate(${ax},${ay}) rotate(${rot})`}>
              {/* Glifo del planeta */}
              <text x={0} y={yG}
                textAnchor="middle" dominantBaseline="central"
                fontFamily="'Noto Sans Symbols 2','Apple Symbols','Segoe UI Symbol',serif"
                fontSize={size * .034} fill={C.plum}
                style={{ fontVariantEmoji: "text" }}>
                {pl.g}
              </text>
              {/* Grado */}
              <text x={0} y={yD}
                textAnchor="middle" dominantBaseline="central"
                fontFamily="Inter,sans-serif"
                fontSize={size * .017} fontWeight="500" fill={INK} opacity=".92">
                {pl.gr}°
              </text>
              {/* Minuto */}
              <text x={0} y={yM}
                textAnchor="middle" dominantBaseline="central"
                fontFamily="Inter,sans-serif"
                fontSize={size * .013} fill={INK2} opacity=".8">
                {pl.min}'{pl.r ? "\u211e" : ""}
              </text>
              {/* Glifo del signo */}
              <text x={0} y={yS}
                textAnchor="middle" dominantBaseline="central"
                fontFamily="'Noto Sans Symbols 2','Apple Symbols','Segoe UI Symbol',serif"
                fontSize={size * .023} fill={EL[SIGN_EL[pl.sign]]}
                style={{ fontVariantEmoji: "text" }}>
                {SIGNS[pl.sign]}
              </text>
            </g>
          </g>
        );
      })}

      {/* Centro */}
      <circle cx={cx} cy={cy} r={Rcen} fill={C.plum} opacity=".5" />
    </svg>
  );
}

// ── ESFERAS WHEEL ─────────────────────────────────────────────────────────────
function EsferasWheel({ placed, phase, chartPlanets, onMove, onMouseUp, onMouseLeave, onSvgClick, onStartDrag, dragging, esferas, selected }) {
  const SZ=400, CX=200, CY=200, RR=148;
  const toRad=d=>((d-90)*Math.PI)/180;
  const pt=(r,d)=>({x:CX+r*Math.cos(toRad(d)),y:CY+r*Math.sin(toRad(d))});
  const aspectColors={conjunción:C.plum,sextil:C.blue,cuadratura:C.terra,trígono:C.sage,oposición:C.muted};
  const getAspects=()=>{
    const res=[];
    Object.entries(placed).forEach(([eid,ep])=>{
      const esf=esferas.find(e=>e.id===eid); if(!esf) return;
      const ang=((Math.atan2(ep.y-CY,ep.x-CX)*180/Math.PI)+90+360)%360;
      chartPlanets.forEach(pl=>{
        let diff=Math.abs(ang-pl.deg); if(diff>180) diff=360-diff;
        let type=null;
        if(diff<10) type="conjunción";
        else if(Math.abs(diff-60)<8) type="sextil";
        else if(Math.abs(diff-90)<8) type="cuadratura";
        else if(Math.abs(diff-120)<8) type="trígono";
        else if(Math.abs(diff-180)<10) type="oposición";
        if(type) res.push({eid,nombre:esf.nombre,glyph:esf.planeta,esfColor:esf.colorHex,planeta:pl.l,type,col:aspectColors[type]});
      });
    });
    return res;
  };
  const aspects=phase==="overlay"?getAspects():[];
  const placedEsferas=esferas.filter(e=>placed[e.id]);
  const signG=["♈︎","♉︎","♊︎","♋︎","♌︎","♍︎","♎︎","♏︎","♐︎","♑︎","♒︎","♓︎"];
  const EL_C={fuego:"#C4856A",tierra:"#7A9E8A",aire:"#A89878",agua:"#7090B8"};
  const SIGN_EL=["fuego","tierra","aire","agua","fuego","tierra","aire","agua","fuego","tierra","aire","agua"];
  const elFill=SIGN_EL.map(e=>EL_C[e]);
  const SYM_FONT="'Noto Sans Symbols 2','Apple Symbols','Segoe UI Symbol',serif";
  return { wheel:(
    <svg viewBox="0 0 400 400" width="100%" style={{display:'block',userSelect:'none',cursor:selected?'crosshair':dragging?'grabbing':'default'}}
      onClick={onSvgClick} onMouseMove={onMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}>
      <circle cx={CX} cy={CY} r={RR+34} fill={C.bg2} stroke={C.border} strokeWidth="1"/>
      {signG.map((_,i)=>{
        const d1=i*30,d2=d1+30;
        const toR=d=>((d-90)*Math.PI)/180;
        const pp=(r,d)=>({x:CX+r*Math.cos(toR(d)),y:CY+r*Math.sin(toR(d))});
        const s1=pp(RR+34,d1),e1=pp(RR+34,d2),s2=pp(RR+4,d2),e2=pp(RR+4,d1);
        const mid=pp(RR+19,d1+15);
        return(
          <g key={i}>
            <path d={`M ${s1.x} ${s1.y} A ${RR+34} ${RR+34} 0 0 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${RR+4} ${RR+4} 0 0 0 ${e2.x} ${e2.y} Z`}
              fill={elFill[i]} stroke={C.bg2} strokeWidth="0.8" opacity="0.12"/>
            <text x={mid.x} y={mid.y} textAnchor="middle" dominantBaseline="central"
              fontSize="12" fill={EL_C[SIGN_EL[i]]} fontFamily={SYM_FONT}
              style={{fontVariantEmoji:"text"}}>{signG[i]}</text>
          </g>
        );
      })}
      {Array.from({length:12},(_,i)=>{
        const toR=d=>((d-90)*Math.PI)/180;
        const pp=(r,d)=>({x:CX+r*Math.cos(toR(d)),y:CY+r*Math.sin(toR(d))});
        const p1=pp(RR+4,i*30),p2=pp(14,i*30);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.border} strokeWidth={i%3===0?.8:.4}/>;
      })}
      <circle cx={CX} cy={CY} r={RR+4} fill="none" stroke={C.borderMd} strokeWidth="1"/>
      <circle cx={CX} cy={CY} r={RR} fill={C.bg3} stroke={C.border} strokeWidth="0.5"/>
      {[.68,.44,.22].map((f,i)=>(
        <circle key={i} cx={CX} cy={CY} r={RR*f} fill="none" stroke={C.border} strokeWidth="0.4" strokeDasharray="3,4"/>
      ))}
      {[{l:"AC",d:0},{l:"MC",d:270},{l:"DC",d:180},{l:"IC",d:90}].map(({l,d})=>{
        const toR=dd=>((dd-90)*Math.PI)/180;
        const pp=(r,dd)=>({x:CX+r*Math.cos(toR(dd)),y:CY+r*Math.sin(toR(dd))});
        const p1=pp(RR+4,d),p2=pp(RR-10,d),tp=pp(RR+20,d);
        return(
          <g key={l}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.plum} strokeWidth="1" opacity="0.5"/>
            <text x={tp.x} y={tp.y} textAnchor="middle" dominantBaseline="central"
              fontSize="8" fontWeight="700" fill={C.plum} fontFamily="Inter" opacity="0.6">{l}</text>
          </g>
        );
      })}
      {/* Overlay carta */}
      {phase==="overlay" && chartPlanets.map((pl,i)=>{
        const toR=d=>((d-90)*Math.PI)/180;
        const pp=(r,d)=>({x:CX+r*Math.cos(toR(d)),y:CY+r*Math.sin(toR(d))});
        const off={202:0,205:12,198:-12,187:-24,39:0,343:0,247:-12,170:0,20:0};
        const d=pl.deg+(off[pl.deg]||0), p=pp(RR*.78,d);
        return(
          <g key={i} opacity="0.45">
            <circle cx={p.x} cy={p.y} r={11} fill={C.bg2} stroke={C.sub} strokeWidth="1"/>
            <text x={p.x} y={p.y+.5} textAnchor="middle" dominantBaseline="central"
              fontSize="9" fill={C.sub} fontFamily="serif">{pl.g}</text>
          </g>
        );
      })}
      {/* Aspect lines */}
      {aspects.map((asp,i)=>{
        const ep=placed[asp.eid];
        const pl=chartPlanets.find(p=>p.l===asp.planeta);
        if(!pl||!ep) return null;
        const toR=d=>((d-90)*Math.PI)/180;
        const pp=(r,d)=>({x:CX+r*Math.cos(toR(d)),y:CY+r*Math.sin(toR(d))});
        const off={202:0,205:12,198:-12,187:-24,39:0,343:0,247:-12,170:0,20:0};
        const d=pl.deg+(off[pl.deg]||0), pp2=pp(RR*.78,d);
        const dash=asp.type==="cuadratura"?"4,3":asp.type==="trígono"?"6,3":asp.type==="sextil"?"2,3":"none";
        return <line key={i} x1={ep.x} y1={ep.y} x2={pp2.x} y2={pp2.y}
          stroke={asp.col} strokeWidth=".9" strokeDasharray={dash} opacity=".65"/>;
      })}
      {/* Esferas */}
      {placedEsferas.map(e=>{
        const pos=placed[e.id], isDrag=dragging===e.id;
        const isLight=["#B8B8C8","#9098A8"].includes(e.colorHex);
        return(
          <g key={e.id} style={{cursor:isDrag?'grabbing':'grab'}}
            onMouseDown={ev=>onStartDrag(e.id,ev)} onTouchStart={ev=>onStartDrag(e.id,ev)}>
            <circle cx={pos.x} cy={pos.y} r={18} fill={e.colorHex} opacity=".1"/>
            <circle cx={pos.x} cy={pos.y} r={14} fill={C.bg2} stroke={e.colorHex}
              strokeWidth={isDrag?2.5:1.8} style={{filter:isDrag?`drop-shadow(0 2px 6px rgba(0,0,0,.15))`:'none'}}/>
            <text x={pos.x} y={pos.y+.5} textAnchor="middle" dominantBaseline="central"
              fontSize="11" fill={isLight?C.sub:e.colorHex} fontFamily="serif">{e.planeta}</text>
            <text x={pos.x} y={pos.y+22} textAnchor="middle" fontSize="7"
              fill={isLight?C.muted:e.colorHex} fontFamily="Inter" fontWeight="700" opacity=".7">{e.num}</text>
          </g>
        );
      })}
      {selected&&<text x={CX} y={SZ-8} textAnchor="middle" fontSize="8.5" fill={C.plum} fontFamily="Inter" opacity=".6">
        Haz clic para posicionar esfera {esferas.find(e=>e.id===selected)?.num}
      </text>}
    </svg>
  ), aspects};
}

// ── PANELS ────────────────────────────────────────────────────────────────────
const elC={agua:C.blue,fuego:C.terra,tierra:C.sage,aire:"#A09060"};

function PCarta(){
  const P = DEMO.planetas;
  const mid = Math.ceil(P.length/2);
  const cols = [P.slice(0,mid), P.slice(mid)];
  const rowStyle = {fontSize:12.5,padding:'6px 6px',borderBottom:`1px solid ${C.border}`,color:C.sub,lineHeight:1.4};
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Rueda protagonista */}
      <div style={card}>
        <div style={label}>Carta natal</div>
        <NatalWheel size={440}/>
        <div style={{display:'flex',gap:18,marginTop:14,justifyContent:'center',flexWrap:'wrap'}}>
          {[[C.blue,"","Armónicos · trígono / sextil"],[C.terra,"","Tensos · cuadratura / oposición"],["#8B7A96","","Conjunción"]].map(([c,d,l])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:6,fontSize:10.5,color:C.muted,fontWeight:500}}>
              <svg width="18" height="5"><line x1="0" y1="2.5" x2="18" y2="2.5" stroke={c} strokeWidth="1.4" strokeDasharray={d}/></svg>{l}
            </div>
          ))}
        </div>
      </div>

      {/* Tabla compacta de posiciones en 2 columnas */}
      <div style={card}>
        <div style={label}>Posiciones planetarias</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 20px'}}>
          {cols.map((col,ci)=>(
            <table key={ci} style={{width:'100%',borderCollapse:'collapse'}}>
              <tbody>
                {col.map((p,i)=>(
                  <tr key={i}>
                    <td style={{...rowStyle,width:'50%'}}>
                      <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",marginRight:6,fontSize:14,color:C.plum,fontVariantEmoji:'text'}}>{p.g}</span>
                      <span style={{color:C.text,fontSize:12}}>{p.p}</span>
                    </td>
                    <td style={{...rowStyle,fontSize:11.5,whiteSpace:'nowrap'}}>
                      <span style={{color:elC[p.el],fontWeight:500}}>{p.s.slice(0,3)}</span>
                      <span style={{color:C.muted,marginLeft:4}}>{p.grado}{p.r?' ℞':''}</span>
                      <span style={{color:C.plum,fontWeight:600,marginLeft:5}}>C{p.c}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
        {/* Ángulos */}
        <div style={{display:'flex',gap:24,marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
          {[{l:"AC",v:"Virgo 9°45'"},{l:"MC",v:"Géminis 6°22'"}].map(a=>(
            <div key={a.l} style={{fontSize:12,color:C.sub}}>
              <span style={{fontWeight:700,color:C.plum,letterSpacing:'.08em',marginRight:8}}>{a.l}</span>{a.v}
            </div>
          ))}
        </div>
        {/* Leyenda elementos */}
        <div style={{display:'flex',gap:16,marginTop:14,flexWrap:'wrap'}}>
          {Object.entries(elC).map(([el,c])=>(
            <div key={el} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:C.muted,fontWeight:500}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:c,display:'inline-block'}}/>
              {el.charAt(0).toUpperCase()+el.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PMemoria(){
  const bars=[{l:"Agua",n:8,c:C.blue},{l:"Fuego",n:4,c:C.terra},{l:"Aire",n:4,c:"#A09060"},{l:"Tierra",n:1,c:C.sage}];
  const M = DEMO.memoria;
  const D = M.dominante;
  const A = M.ausencia;
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Qué es la memoria sistémica */}
      <div style={card}>
        <div style={label}>Memoria sistémica · qué es</div>
        <p style={cardText}>{M.definicion}</p>
        <p style={{...cardText,marginTop:10}}>{M.tipos}</p>
      </div>

      {/* Distribución elemental */}
      <div style={card}>
        <div style={label}>Distribución elemental</div>
        <div style={{fontSize:34,fontWeight:700,letterSpacing:'-.02em',margin:'8px 0 2px',color:C.text}}>Enfática {D.elemento}</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:22}}>{D.pct} · 8 de 17 planetas en signos de agua</div>
        {bars.map(b=>(
          <div key={b.l} style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:5,color:C.text,fontWeight:500}}><span>{b.l}</span><span style={{fontWeight:400,color:C.muted}}>{b.n}</span></div>
            <div style={{height:4,background:C.border,borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',borderRadius:2,background:b.c,width:`${(b.n/17)*100}%`}}/></div>
          </div>
        ))}
      </div>

      {/* Memoria dominante — descripción */}
      <div style={{...card,borderTop:`3px solid ${C.blue}`}}>
        <div style={{...label,color:C.blue}}>Memoria {D.elemento} · dominante</div>
        <div style={{fontSize:18,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:10}}>El elemento que teje el sistema</div>
        <p style={cardText}>{D.descripcion}</p>
      </div>

      {/* Rejilla de atributos de la memoria dominante */}
      <div style={card}>
        <div style={label}>Claves de la memoria {D.elemento}</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:4}}>
          {[
            ["Expresión junguiana", D.jung],
            ["Linaje relacionado", D.linaje],
            ["Conexión generacional", D.generacional],
            ["Representantes del sistema", D.representantes],
          ].map(([l,v])=>(
            <div key={l}>
              <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:C.muted,marginBottom:3}}>{l}</div>
              <p style={{fontSize:12.5,color:C.sub,lineHeight:1.55,fontWeight:300}}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emoción y proyección */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 240px'}}>
          <div style={label}>Emoción primal</div>
          <p style={cardText}>{D.emocion}</p>
        </div>
        <div style={{...card,flex:'1 1 240px'}}>
          <div style={label}>Mecanismo proyectivo</div>
          <p style={cardText}>{D.proyeccion}</p>
        </div>
      </div>

      {/* Tema principal */}
      <div style={card}>
        <div style={label}>Tema principal del linaje</div>
        <p style={cardText}>{D.tema}</p>
      </div>

      {/* Imágenes arquetípicas */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.12)`}}>
        <div style={label}>Imágenes arquetípicas</div>
        <p style={{fontSize:14,color:C.plum,fontWeight:500,lineHeight:1.6,fontStyle:'italic'}}>{D.arquetipos}</p>
      </div>

      {/* Asuntos y embrollos */}
      <div style={card}>
        <div style={{...label,color:C.terra}}>Asuntos y embrollos · lo que puede repetirse</div>
        <p style={cardText}>{D.embrollos}</p>
      </div>

      {/* Talentos y síntomas */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 240px',borderTop:`3px solid ${C.sage}`}}>
          <div style={{...label,color:C.sage}}>Talentos y cualidades</div>
          <p style={cardText}>{D.talentos}</p>
        </div>
        <div style={{...card,flex:'1 1 240px'}}>
          <div style={{...label,color:C.terra}}>Somatización</div>
          <p style={cardText}>{D.sintomas}</p>
        </div>
      </div>

      {/* ── AUSENCIA ── */}
      <div style={{...card,marginTop:20,borderTop:`3px solid ${C.terra}`}}>
        <div style={{...label,color:C.terra}}>Ausencia de memoria · {A.elemento}</div>
        <div style={{fontSize:18,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:4}}>{A.titulo}</div>
        <div style={{fontSize:12,color:C.muted,marginBottom:14,fontWeight:300}}>Expresión junguiana ausente: {A.jung}</div>
        <p style={{...cardText,marginBottom:14}}>{A.queRepresenta}</p>
        {A.puntos.map((p,i)=>(
          <div key={i} style={{display:'flex',gap:10,marginBottom:9}}>
            <span style={{color:C.terra,fontWeight:700,flexShrink:0,fontSize:13}}>·</span>
            <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{p}</p>
          </div>
        ))}
      </div>

      {/* Integración de la ausencia */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`}}>
        <div style={label}>El movimiento reparador</div>
        <p style={{...cardText,color:C.sub}}>{A.integrar}</p>
      </div>
    </div>
  );
}

function PSignoOculto(){
  const S = DEMO.signoOculto;
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Cabecera */}
      <div style={{...card,borderTop:`3px solid ${C.plum}`}}>
        <div style={label}>Signo oculto</div>
        <div style={{display:'flex',alignItems:'baseline',gap:14,margin:'6px 0 4px'}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:52,fontStyle:'italic',fontWeight:500,color:C.plum,lineHeight:1}}>{S.signo}</div>
          <div style={{fontSize:13,color:C.muted,fontWeight:400}}>{S.casa} · {S.casaTitulo}</div>
        </div>
        <p style={{...cardText,marginTop:12}}>{S.definicion}</p>
      </div>

      {/* Aforismo */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.12)`}}>
        <div style={label}>Aforismo</div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontStyle:'italic',fontWeight:500,color:C.text,lineHeight:1.45}}>{S.aforismo}</p>
      </div>

      {/* Cálculo */}
      <div style={card}>
        <div style={label}>Cómo se calcula</div>
        <p style={cardText}>{S.calculo}</p>
      </div>

      {/* Don / Virtud / Vicio */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 200px',borderTop:`3px solid ${C.sage}`}}>
          <div style={{...label,color:C.sage}}>Don oculto</div>
          <p style={cardText}>{S.donOculto}</p>
        </div>
        <div style={{...card,flex:'1 1 200px',borderTop:`3px solid ${C.blue}`}}>
          <div style={{...label,color:C.blue}}>La virtud</div>
          <p style={cardText}>{S.virtud}</p>
        </div>
        <div style={{...card,flex:'1 1 200px',borderTop:`3px solid ${C.terra}`}}>
          <div style={{...label,color:C.terra}}>El vicio</div>
          <p style={cardText}>{S.vicio}</p>
        </div>
      </div>

      {/* Retos */}
      <div style={card}>
        <div style={label}>Retos de conciencia</div>
        {S.retos.map((r,i)=>(
          <div key={i} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:i<S.retos.length-1?`1px solid ${C.border}`:'none'}}>
            <span style={{color:C.plum,fontWeight:700,flexShrink:0}}>{i+1}.</span>
            <p style={{fontSize:13.5,color:C.text,lineHeight:1.5,fontStyle:'italic',fontWeight:400}}>«{r}»</p>
          </div>
        ))}
      </div>

      {/* Lectura de la casa */}
      <div style={{...card,borderLeft:`3px solid ${C.plum}`}}>
        <div style={label}>{S.signo} en {S.casa} · {S.casaTitulo}</div>
        <p style={cardText}>{S.casaLectura}</p>
        <p style={{fontSize:12,color:C.muted,lineHeight:1.6,fontWeight:300,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>{S.planetasEn}</p>
      </div>

      {/* Somático + Propósito */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 240px'}}>
          <div style={{...label,color:C.terra}}>Patrón psicosomático</div>
          <p style={cardText}>{S.somatico}</p>
        </div>
        <div style={{...card,flex:'1 1 240px',background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`}}>
          <div style={label}>El propósito</div>
          <p style={{...cardText,color:C.sub}}>{S.proposito}</p>
        </div>
      </div>
    </div>
  );
}

function PAscendente(){
  const A = DEMO.ascendente;
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Definición */}
      <div style={{...card,borderTop:`3px solid ${C.plum}`}}>
        <div style={label}>Ascendente sistémico</div>
        <div style={{fontSize:19,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:10}}>La puerta de entrada al árbol</div>
        <p style={cardText}>{A.definicion}</p>
      </div>

      {/* AC y MC */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div style={{...card,margin:0,borderTop:`3px solid ${C.plum}`}}>
          <div style={label}>Ascendente</div>
          <div style={{fontSize:20,fontWeight:700,letterSpacing:'-.02em',color:C.plum,marginBottom:8}}>{A.ac}</div>
          <p style={cardText}>{A.acLectura}</p>
        </div>
        <div style={{...card,margin:0,borderTop:`3px solid ${C.blue}`}}>
          <div style={label}>Medio Cielo</div>
          <div style={{fontSize:20,fontWeight:700,letterSpacing:'-.02em',color:C.blue,marginBottom:8}}>{A.mc}</div>
          <p style={cardText}>{A.mcLectura}</p>
        </div>
      </div>

      {/* Casas derivadas */}
      <div style={card}>
        <div style={label}>Casas derivadas · el mapa del linaje</div>
        <p style={{fontSize:12.5,color:C.sub,lineHeight:1.65,fontWeight:300,marginBottom:16}}>{A.casasDerivadasIntro}</p>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr>
            {["Eje","Figura del sistema","Planetas"].map(h=>(
              <th key={h} style={{fontSize:10,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:C.muted,textAlign:'left',padding:'0 10px 10px',borderBottom:`1px solid ${C.border}`}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{DEMO.casas.map((c,i)=>(
            <tr key={i}>
              <td style={{...td,fontWeight:600,color:C.plum}}>{c.eje}</td>
              <td style={td}>{c.sig}</td>
              <td style={{...td,color:C.muted,fontSize:12}}>{c.plan}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function POrdenes(){
  const O = DEMO.ordenes;
  const bloques = [
    {key:"pertenencia", data:O.pertenencia, col:C.plum},
    {key:"jerarquia",   data:O.jerarquia,   col:C.blue},
    {key:"equilibrio",  data:O.equilibrio,  col:C.terra},
  ];
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Intro */}
      <div style={card}>
        <div style={label}>Los órdenes del amor</div>
        <div style={{fontSize:19,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:12}}>Pertenencia · Jerarquía · Equilibrio</div>
        <p style={{...cardText,fontStyle:'italic'}}>{O.intro}</p>
      </div>

      {/* Los tres órdenes */}
      {bloques.map(({key,data,col})=>(
        <div key={key} style={{...card,borderTop:`3px solid ${col}`}}>
          <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:4}}>
            <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:22,color:col,fontVariantEmoji:'text'}}>{data.glifo}</span>
            <div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:col}}>{key}</div>
              <div style={{fontSize:16,fontWeight:700,color:C.text}}>{data.titulo}</div>
            </div>
            <span style={{marginLeft:'auto',fontSize:11,color:C.muted,fontWeight:400}}>{data.planeta}</span>
          </div>
          <p style={{...cardText,marginTop:10}}>{data.def}</p>

          {/* Contenido específico de cada orden */}
          {data.inclusionExclusion && (
            <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
              <div style={label}>Inclusión y exclusión</div>
              <p style={cardText}>{data.inclusionExclusion}</p>
            </div>
          )}
          {data.tresPlanetas && (
            <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
              <div style={{...label,marginBottom:10}}>Los tres marcadores</div>
              {data.tresPlanetas.map((tp,i)=>(
                <div key={i} style={{display:'flex',gap:12,padding:'8px 0',borderBottom:i<data.tresPlanetas.length-1?`1px solid ${C.border}`:'none'}}>
                  <div style={{minWidth:70,flexShrink:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.plum}}>{tp.p}</div>
                    <div style={{fontSize:10,color:C.muted,fontWeight:400}}>{tp.r}</div>
                  </div>
                  <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{tp.d}</p>
                </div>
              ))}
            </div>
          )}
          {data.desequilibrios && (
            <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
              <div style={{...label,marginBottom:10}}>Los dos desequilibrios</div>
              {data.desequilibrios.map((de,i)=>(
                <div key={i} style={{marginBottom:i<data.desequilibrios.length-1?10:0}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.terra,marginBottom:2}}>{de.t}</div>
                  <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{de.d}</p>
                </div>
              ))}
            </div>
          )}

          {/* Cómo aparece en la carta de Debora */}
          <div style={{marginTop:14,background:`${col}0D`,borderRadius:10,padding:'14px 16px',borderLeft:`2px solid ${col}`}}>
            <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:col,marginBottom:3}}>En esta carta · {data.posicionDebora}</div>
            <div style={{fontSize:13.5,fontWeight:600,color:C.text,marginBottom:6}}>{data.aspectoDebora.nom}</div>
            <p style={{fontSize:13,color:C.sub,lineHeight:1.7,fontWeight:300}}>{data.aspectoDebora.txt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PAsteroides(){
  const A = DEMO.asteroides;
  const colEl = {Tierra:C.sage, Aire:"#A89878", Agua:C.blue, Fuego:C.terra};
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Intro */}
      <div style={card}>
        <div style={label}>Asteroides femeninos</div>
        <div style={{fontSize:19,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:10}}>Las figuras del linaje</div>
        <p style={cardText}>{A.intro}</p>
        <div style={{display:'flex',gap:14,marginTop:16,flexWrap:'wrap'}}>
          {A.lista.map(a=>(
            <div key={a.nombre} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:C.sub,fontWeight:400}}>
              <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:15,color:colEl[a.elemento],fontVariantEmoji:'text'}}>{a.g}</span>
              <span style={{fontWeight:600,color:C.text}}>{a.nombre}</span>
              <span style={{color:C.muted}}>· {a.arquetipo}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cada asteroide */}
      {A.lista.map((a,i)=>{
        const col = colEl[a.elemento];
        return(
          <div key={i} style={{...card,borderTop:`3px solid ${col}`}}>
            <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:4}}>
              <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:26,color:col,fontVariantEmoji:'text'}}>{a.g}</span>
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:col}}>{a.arquetipo}</div>
                <div style={{fontSize:17,fontWeight:700,color:C.text}}>{a.nombre}</div>
              </div>
              <span style={{marginLeft:'auto',textAlign:'right'}}>
                <div style={{fontSize:12,color:C.plum,fontWeight:600}}>{a.pos}</div>
                <div style={{fontSize:10,color:C.muted,fontWeight:400}}>Memoria {a.elemento}</div>
              </span>
            </div>
            <p style={{...cardText,marginTop:10}}>{a.lectura}</p>

            <div style={{marginTop:12}}>
              <div style={{...label,color:C.terra}}>Conflicto sistémico típico</div>
              <p style={cardText}>{a.conflicto}</p>
            </div>
            <div style={{marginTop:11}}>
              <div style={label}>Manifestación en la vida</div>
              <p style={cardText}>{a.manifestacion}</p>
            </div>

            {/* Matiz por posición */}
            <div style={{marginTop:12,background:`${col}0D`,borderRadius:8,padding:'11px 14px',borderLeft:`2px solid ${col}`}}>
              <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:col,marginBottom:3}}>En esta carta · {a.pos}</div>
              <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{a.matiz}</p>
            </div>

            {/* Pregunta clave */}
            <div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
              <div style={label}>Pregunta clave</div>
              <p style={{fontSize:14,color:C.text,fontStyle:'italic',fontWeight:400,lineHeight:1.5}}>«{a.pregunta}»</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PSaturno(){
  const S = DEMO.saturno;
  const L = DEMO.lilithQ;
  return(
    <div style={{padding:'24px 20px'}}>
      {/* ── MANDATOS DE SATURNO ── */}
      <div style={card}>
        <div style={label}>El mandato · qué es</div>
        <div style={{fontSize:19,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:10}}>Lo que hay que cumplir para pertenecer</div>
        <p style={cardText}>{S.mandatoDef}</p>
      </div>

      {/* Signo y casa */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 240px'}}>
          <div style={label}>El signo · la narrativa</div>
          <div style={{fontSize:15,fontWeight:600,color:C.plum,marginBottom:6}}>Saturno en {S.signo}</div>
          <p style={cardText}>{S.signoNarrativa}</p>
        </div>
        <div style={{...card,flex:'1 1 240px'}}>
          <div style={label}>La casa · el ámbito</div>
          <div style={{fontSize:15,fontWeight:600,color:C.plum,marginBottom:6}}>{S.casa}</div>
          <p style={cardText}>{S.casaNarrativa}</p>
        </div>
      </div>

      {/* Los 5 mandatos de Sagitario */}
      <div style={card}>
        <div style={label}>Mandatos heredados · Saturno en {S.signo}</div>
        {S.mandatos.map((m,i)=>(
          <div key={i} style={{display:'flex',gap:12,padding:'11px 0',
            borderBottom:i<S.mandatos.length-1?`1px solid ${C.border}`:'none'}}>
            <div style={{width:5,flexShrink:0,borderRadius:3,background:C.plumSoft}}/>
            <div>
              <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:3,fontStyle:'italic'}}>{m.t}</div>
              <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{m.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Integrado vs no integrado */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 240px',borderTop:`3px solid ${C.sage}`}}>
          <div style={{...label,color:C.sage}}>Cuando está integrado</div>
          <p style={cardText}>{S.integrado}</p>
        </div>
        <div style={{...card,flex:'1 1 240px',borderTop:`3px solid ${C.terra}`}}>
          <div style={{...label,color:C.terra}}>Cuando no está integrado</div>
          <p style={cardText}>{S.noIntegrado}</p>
        </div>
      </div>

      {/* Clave liberadora */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`}}>
        <div style={label}>Clave liberadora</div>
        <div style={{fontSize:16,fontWeight:600,color:C.plum}}>{S.claveLiberadora}</div>
      </div>

      {/* Aspectos: de qué figura viene el mandato */}
      <div style={card}>
        <div style={label}>¿De qué figura viene el mandato?</div>
        {S.aspectos.map((a,i)=>(
          <div key={i} style={{padding:'12px 0',borderBottom:i<S.aspectos.length-1?`1px solid ${C.border}`:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:5}}>
              <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:17,color:C.plum,fontVariantEmoji:'text'}}>{a.asp}</span>
              <span style={{fontSize:14,fontWeight:600,color:C.text}}>{a.nom}</span>
            </div>
            <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300,marginBottom:5}}>{a.desc}</p>
            <div style={{fontSize:10.5,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',color:C.terra}}>Figura: {a.figura}</div>
          </div>
        ))}
        <p style={{fontSize:11.5,color:C.muted,lineHeight:1.6,fontWeight:300,marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`,fontStyle:'italic'}}>{S.aspectoLeyenda}</p>
      </div>

      {/* Lectura de la casa 3 */}
      <div style={{...card,borderTop:`3px solid ${C.plum}`}}>
        <div style={label}>Cómo se expresa · Saturno en {S.casa}</div>
        <p style={cardText}>{S.casaLectura}</p>
        <p style={{fontSize:11.5,color:C.muted,lineHeight:1.6,fontWeight:300,marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>{S.casaEscenario}</p>
      </div>
    </div>
  );
}

function PPuntoMedio(){
  const L = DEMO.lilithQ;
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Cabecera */}
      <div style={{...card,borderTop:`3px solid ${C.plum}`}}>
        <div style={label}>Punto Medio Lilith–Quirón</div>
        <div style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:'-.01em',marginBottom:6}}>El fracaso existencial y su sendero</div>
        <p style={{fontSize:13,color:C.plum,fontWeight:600,marginBottom:10}}>⚸ Lilith Libra C2 + ⚷ Quirón Géminis C10 ℞ → {L.posicion}</p>
        <p style={{fontSize:11.5,color:C.muted,fontWeight:300,marginBottom:12,fontStyle:'italic'}}>{L.calculo}</p>
        <p style={cardText}>{L.definicion}</p>
      </div>

      {/* El circuito */}
      <div style={card}>
        <div style={label}>El circuito Lilith–Quirón</div>
        <p style={cardText}>{L.circuito}</p>
      </div>

      {/* Antecedentes sistémicos */}
      <div style={card}>
        <div style={label}>Antecedentes sistémicos · {L.posicion}</div>
        <p style={cardText}>{L.antecedentes}</p>
      </div>

      {/* Ley mentira vs ley eterna */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 220px',borderTop:`3px solid ${C.terra}`}}>
          <div style={{...label,color:C.terra}}>Ley mentira</div>
          <p style={{fontSize:15,color:C.text,fontStyle:'italic',lineHeight:1.5,fontWeight:400,marginBottom:0}}>{L.leyMentira}</p>
        </div>
        <div style={{...card,flex:'1 1 220px',borderTop:`3px solid ${C.sage}`}}>
          <div style={{...label,color:C.sage}}>Ley eterna · el sendero</div>
          <p style={{fontSize:13.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{L.leyEterna}</p>
        </div>
      </div>

      {/* Sobrecompensación */}
      <div style={card}>
        <div style={label}>Ley de sobrecompensación</div>
        <p style={{fontSize:11.5,color:C.muted,fontWeight:300,marginBottom:10}}>Mecanismo de defensa que oculta la herida de forma transitoria. Su efecto es pasajero y solo encubre la herida verdadera.</p>
        <p style={cardText}>{L.sobrecompensacion}</p>
      </div>

      {/* Somatización + experiencia */}
      <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
        <div style={{...card,flex:'1 1 220px'}}>
          <div style={{...label,color:C.terra}}>Somatización · puntos gatillo</div>
          <p style={cardText}>{L.somatizacion}</p>
        </div>
        <div style={{...card,flex:'1 1 220px'}}>
          <div style={label}>Experiencia vital · {L.posicion}</div>
          <p style={cardText}>{L.experiencia}</p>
        </div>
      </div>

      {/* Sendero sanador */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`}}>
        <div style={label}>El sendero sanador</div>
        <p style={{...cardText,color:C.sub}}>{L.sanacion}</p>
        <div style={{fontSize:10.5,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',color:C.muted,marginTop:12}}>Aspectos planetarios implicados · {L.aspectos}</div>
      </div>
    </div>
  );
}

function PSomatica(){
  return(
    <div style={{padding:'24px 20px'}}>
      <div style={card}>
        <div style={label}>Sistemas corporales activados</div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr>
            {["Signo","Conc.","Sistema"].map(h=>(
              <th key={h} style={{fontSize:10,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:C.muted,textAlign:'left',padding:'0 10px 10px',borderBottom:`1px solid ${C.border}`}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{DEMO.soma.map((s,i)=>(
            <tr key={i} style={{background:s.foco?C.terraSoft:'transparent'}}>
              <td style={{...td,fontWeight:s.foco?600:400,borderLeft:s.foco?`2px solid ${C.terra}`:'none',paddingLeft:s.foco?8:10}}>{s.s}</td>
              <td style={td}><div style={{display:'flex',gap:3}}>{Array.from({length:s.n}).map((_,j)=>(
                <div key={j} style={{width:8,height:8,borderRadius:2,background:s.foco?C.terra:C.border}}/>
              ))}</div></td>
              <td style={{...td,color:C.muted,fontSize:12}}>{s.sys}</td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{marginTop:16,padding:'12px 14px',background:C.terraSoft,borderRadius:8,borderLeft:`2px solid ${C.terra}`}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:C.terra,marginBottom:5}}>Foco principal</div>
          <p style={{fontSize:13,color:C.sub,lineHeight:1.65,fontWeight:300}}>Concentración escorpiana (Sol, Mercurio, Venus, Plutón, Ceres) — mayor carga en sistema inmune, reproductivo y colon.</p>
        </div>
      </div>
    </div>
  );
}

function PAspectos(){
  const A = DEMO.aspectos;
  const T = DEMO.tiposAspecto;
  // Colores por familia de aspecto (coherentes con la rueda)
  const COL = { conj:C.plum, harm:C.blue, tens:C.terra, quin:"#9A96A4" };
  const [abierto, setAbierto] = useState(0); // primer aspecto abierto por defecto

  return(
    <div style={{padding:'24px 20px'}}>
      {/* Intro */}
      <div style={card}>
        <div style={label}>Aspectos · lazos que unen o separan</div>
        <div style={{fontSize:19,fontWeight:700,letterSpacing:'-.01em',color:C.text,marginBottom:10}}>La conversación entre los planetas</div>
        <p style={cardText}>
          Los aspectos son las distancias angulares entre planetas. En astrogenealogía no describen sólo el carácter del consultante: revelan <strong style={{color:C.text,fontWeight:500}}>conflictos, recursos y lealtades heredadas</strong> del sistema familiar. Cada aspecto es un tipo de movimiento — fusión, fricción, fluidez, polarización, oportunidad o reajuste — que se ha ido transmitiendo de generación en generación hasta expresarse hoy en la vida de la consultante.
        </p>
        <div style={{display:'flex',gap:14,marginTop:16,flexWrap:'wrap'}}>
          {[["Fusión",C.plum,"☌"],["Fluidez / Oportunidad",C.blue,"△ ⚹"],["Fricción / Polarización",C.terra,"□ ☍"],["Reajuste","#9A96A4","⚻"]].map(([l,c,s])=>(
            <div key={l} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:C.sub,fontWeight:400}}>
              <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:13,color:c,fontVariantEmoji:'text'}}>{s}</span>
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Nota de foco */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`}}>
        <div style={label}>Ejes principales de esta carta</div>
        <p style={{...cardText,color:C.sub}}>
          La fuerte concentración en Escorpio (Sol, Mercurio, Venus, Plutón, Ceres) sitúa el poder, la transformación y los secretos del linaje en el centro del mapa — aunque los planetas están lo bastante separados en grados como para no formar conjunciones exactas entre sí. Los aspectos que más movimiento piden son el <strong style={{color:C.plum,fontWeight:600}}>trígono Luna–Plutón</strong> (fuerza regenerativa del matriarcado), la <strong style={{color:C.plum,fontWeight:600}}>cuadratura Marte–Plutón</strong> (luchas de poder) y el <strong style={{color:C.plum,fontWeight:600}}>quíncuncio Luna–Marte</strong> (cuidar frente a actuar). Todos giran en torno al mismo eje: poder, emoción y acción heredados.
        </p>
      </div>

      {/* Lista de aspectos */}
      {A.map((a,i)=>{
        const ti = T[a.tipo];
        const c  = COL[ti.col];
        const isOpen = abierto===i;
        return(
          <div key={i} style={{...card,padding:0,overflow:'hidden',
            borderLeft:a.focoDebora?`3px solid ${c}`:`1px solid ${C.border}`,
            borderTop:a.focoDebora?`1px solid ${C.border}`:`1px solid ${C.border}`,
            borderRight:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
            {/* Cabecera clicable */}
            <div onClick={()=>setAbierto(isOpen?-1:i)}
              style={{display:'flex',alignItems:'center',gap:12,padding:'16px 20px',cursor:'pointer',
                background:isOpen?C.bg3:'transparent',transition:'background .15s'}}>
              {/* glifos */}
              <div style={{display:'flex',alignItems:'center',gap:5,flexShrink:0}}>
                <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:19,color:C.plum,fontVariantEmoji:'text'}}>{a.g1}</span>
                <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:13,color:c,fontVariantEmoji:'text'}}>{ti.sym}</span>
                <span style={{fontFamily:"'Noto Sans Symbols 2','Apple Symbols',serif",fontSize:19,color:C.plum,fontVariantEmoji:'text'}}>{a.g2}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{a.p1} {ti.sym} {a.p2}</div>
                <div style={{fontSize:11,color:C.muted,fontWeight:300,marginTop:1}}>{a.tema}</div>
              </div>
              {/* etiqueta movimiento */}
              <span style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',
                padding:'3px 9px',borderRadius:4,background:`${c}18`,color:c,flexShrink:0,whiteSpace:'nowrap'}}>
                {ti.mov}
              </span>
              <span style={{fontSize:14,color:C.muted,flexShrink:0,transform:isOpen?'rotate(90deg)':'none',transition:'transform .2s'}}>›</span>
            </div>

            {/* Cuerpo desplegable */}
            {isOpen && (
              <div style={{padding:'4px 20px 20px'}}>
                <div style={{fontSize:11,color:C.muted,fontWeight:300,marginBottom:14,fontStyle:'italic'}}>{a.orbe}</div>

                {/* Movimiento sistémico del tipo */}
                <div style={{background:C.bg,borderRadius:8,padding:'12px 14px',marginBottom:14,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:c,marginBottom:4}}>Movimiento · {ti.mov}</div>
                  <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{ti.desc} {ti.din}</p>
                </div>

                {/* Campos sistémicos */}
                {[
                  ["Tema sistémico central", a.tema],
                  ["Conflicto heredado", a.conflicto],
                  ["Emoción dominante", a.emocion],
                  ["Expresión en la vida adulta", a.adulta],
                  ["Repetición típica", a.repeticion],
                ].map(([lb,tx])=>(
                  <div key={lb} style={{marginBottom:11}}>
                    <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:C.muted,marginBottom:3}}>{lb}</div>
                    <p style={{fontSize:13,color:C.sub,lineHeight:1.65,fontWeight:300}}>{tx}</p>
                  </div>
                ))}

                {/* Pregunta clave + orden del amor */}
                <div style={{display:'flex',gap:10,marginTop:14,flexWrap:'wrap',alignItems:'stretch'}}>
                  <div style={{flex:'1 1 260px',background:`${c}0D`,borderLeft:`2px solid ${c}`,borderRadius:'0 8px 8px 0',padding:'12px 14px'}}>
                    <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:c,marginBottom:5}}>Pregunta de conciencia</div>
                    <p style={{fontSize:13.5,color:C.text,lineHeight:1.6,fontWeight:400,fontStyle:'italic'}}>«{a.pregunta}»</p>
                  </div>
                  {a.orden && (
                    <div style={{flexShrink:0,display:'flex',flexDirection:'column',justifyContent:'center',
                      background:C.bg3,borderRadius:8,padding:'12px 16px',minWidth:100}}>
                      <div style={{fontSize:9.5,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:C.muted,marginBottom:4}}>Orden del amor</div>
                      <div style={{fontSize:14,fontWeight:600,color:C.plum}}>{a.orden}</div>
                    </div>
                  )}
                </div>

                {/* Riesgo sistémico */}
                <div style={{marginTop:12,display:'flex',gap:7,alignItems:'flex-start',fontSize:11.5,color:C.muted,fontWeight:300}}>
                  <span style={{color:C.terra,fontWeight:600,flexShrink:0}}>Riesgo:</span>
                  <span>{ti.riesgo}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Nota metodológica */}
      <div style={{...card,marginTop:4}}>
        <div style={label}>Cómo se lee en sesión</div>
        <p style={cardText}>
          Cada aspecto se trabaja primero identificando el <strong style={{color:C.text,fontWeight:500}}>tipo de movimiento</strong> (¿fusión, fricción, fluidez…?), luego rastreando el <strong style={{color:C.text,fontWeight:500}}>conflicto o recurso heredado</strong> en el árbol, y finalmente devolviendo al consultante la <strong style={{color:C.text,fontWeight:500}}>pregunta de conciencia</strong> para que el reconocimiento abra el movimiento reparador. Los aspectos armónicos señalan lo disponible; los tensos, lo que pide integración.
        </p>
      </div>
    </div>
  );
}

function PSintesis(){
  const S = DEMO.sintesis;
  const colMap = {plum:C.plum, terra:C.terra, sage:C.sage, blue:C.blue};
  return(
    <div style={{padding:'24px 20px'}}>
      {/* Hilo conductor */}
      <div style={{...card,borderTop:`3px solid ${C.plum}`}}>
        <div style={label}>Síntesis clínica · el hilo conductor</div>
        <div style={{fontSize:20,fontWeight:700,letterSpacing:'-.01em',color:C.text,marginBottom:12}}>La historia que cuenta la carta</div>
        <p style={cardText}>{S.hilo}</p>
      </div>

      {/* Ejes de trabajo */}
      <div style={card}>
        <div style={label}>Ejes de trabajo prioritarios</div>
        {S.ejes.map((e,i)=>(
          <div key={i} style={{display:'flex',gap:14,padding:'14px 0',
            borderBottom:i<S.ejes.length-1?`1px solid ${C.border}`:'none'}}>
            <div style={{width:26,height:26,borderRadius:'50%',flexShrink:0,
              background:`${colMap[e.col]}18`,color:colMap[e.col],
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:12,fontWeight:700}}>{i+1}</div>
            <div>
              <div style={{fontSize:14.5,fontWeight:600,color:C.text,marginBottom:4}}>{e.t}</div>
              <p style={{fontSize:12.5,color:C.sub,lineHeight:1.6,fontWeight:300}}>{e.d}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Preguntas de apertura */}
      <div style={card}>
        <div style={label}>Preguntas de apertura para la sesión</div>
        {S.preguntas.map((q,i)=>(
          <div key={i} style={{display:'flex',gap:10,padding:'9px 0',
            borderBottom:i<S.preguntas.length-1?`1px solid ${C.border}`:'none'}}>
            <span style={{color:C.plum,fontWeight:700,flexShrink:0,fontSize:13}}>{i+1}.</span>
            <p style={{fontSize:13.5,color:C.text,lineHeight:1.6,fontWeight:400,fontStyle:'italic'}}>«{q}»</p>
          </div>
        ))}
      </div>

      {/* Movimiento reparador global */}
      <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`}}>
        <div style={label}>El movimiento reparador</div>
        <p style={{...cardText,color:C.sub}}>{S.movimiento}</p>
      </div>
    </div>
  );
}

function PNotas(){
  const[v,setV]=useState("La consultante presenta una concentración muy significativa en Escorpio (Sol, Mercurio, Venus, Plutón, Ceres), toda en Casa 3, con Luna en Cáncer en Casa 10. El signo oculto Piscis sugiere patrones de sacrificio y disolución operando de forma inconsciente.\n\nExplorar en próxima sesión: relación con la figura materna y su impacto en la vocación; el poder y los secretos del linaje expresados a través de la palabra y el vínculo con los hermanos.");
  return(
    <div style={{padding:'24px 20px'}}>
      <div style={card}>
        <div style={label}>Notas de sesión</div>
        <textarea value={v} onChange={e=>setV(e.target.value)}
          placeholder="Notas de sesión..."
          style={{width:'100%',minHeight:200,fontFamily:'Inter,sans-serif',fontSize:14,color:C.text,
            lineHeight:1.85,background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,
            padding:14,outline:'none',resize:'vertical',fontWeight:300}}/>
        <div style={{fontSize:11,color:C.muted,marginTop:8}}>Guardado hace 2 minutos</div>
      </div>
    </div>
  );
}

function PEsferas(){
  // PROTOCOLO REAL según apuntes de Enzo De Paola:
  // 4 esferas en orden, cada una con su pregunta específica
  // Al final: superposición con la carta natal

  const [fase, setFase] = useState("intro");       // intro | ronda | superposicion
  const [ronda, setRonda] = useState(0);            // 0..3 = las 4 esferas
  const [esferas, setEsferas] = useState([null,null,null,null]); // esfera elegida por slot
  const [posiciones, setPosiciones] = useState([null,null,null,null]); // {x,y} en SVG
  const [dragging, setDragging] = useState(null);   // índice de la esfera siendo arrastrada
  const [dragOffset, setDragOffset] = useState({x:0,y:0});
  const [selector, setSelector] = useState(false);  // panel de selección visible

  const SZ=400, CX=200, CY=200;
  const Rdeg_=SZ*.487, Rzod_=SZ*.460, Rzi_=SZ*.390, Rasi_=SZ*.250;
  const INK="#3A3644", INK2="#5C5868";
  const toRad = d => ((d-90)*Math.PI)/180;
  const ptW   = (r,d) => ({x:CX+r*Math.cos(toRad(d)), y:CY+r*Math.sin(toRad(d))});
  const SIGNS_E = ["♈\uFE0E","♉\uFE0E","♊\uFE0E","♋\uFE0E","♌\uFE0E","♍\uFE0E","♎\uFE0E","♏\uFE0E","♐\uFE0E","♑\uFE0E","♒\uFE0E","♓\uFE0E"];
  const EL_C_E = {fuego:"#C4856A",tierra:"#7A9E8A",aire:"#A89878",agua:"#7090B8"};
  const SIGN_EL_E = ["fuego","tierra","aire","agua","fuego","tierra","aire","agua","fuego","tierra","aire","agua"];
  const EL_FILL_E = SIGN_EL_E.map(e=>EL_C_E[e]);
  const HN_E = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
  // Colores pastel para aspectos natales de la rueda interna
  const HARM_E = "#7090B8", TENS_E = "#C4856A", CONJ_E = "#8B7A96", QUIN_E = "#A0A0A8";
  const VIS_E = {205:13,198:-13,187:-26,257:10,247:-10};
  const ASP_COL = {conjunción:CONJ_E,sextil:HARM_E,cuadratura:TENS_E,trígono:HARM_E,oposición:TENS_E,quíncuncio:QUIN_E};
  const ASP_DASH = {conjunción:"none",sextil:"2,3",cuadratura:"4,3",trígono:"none",oposición:"none",quíncuncio:"5,2,2,2"};

  // Las 4 rondas del protocolo
  const RONDAS = [
    {
      num: "1ª",
      titulo: "Esfera del YO",
      descripcion: "Elige la esfera que representa cómo te sientes TÚ en este momento en relación al conflicto que has traído hoy a consulta.",
      preguntas: [
        "¿Dónde quieres ubicarla en la rueda?",
        "¿Qué sientes al colocarla ahí?",
        "¿En qué parte del cuerpo sientes esa energía?",
        "¿Qué sensación te produce?"
      ],
      color: C.plum
    },
    {
      num: "2ª",
      titulo: "Esfera del PROBLEMA",
      descripcion: "Elige la esfera que representa el PROBLEMA que has traído hoy. El conflicto, la situación, lo que quieres trabajar.",
      preguntas: [
        "¿Dónde quieres ubicarla en la rueda?",
        "¿Qué sientes al colocarla ahí?",
        "¿En qué parte del cuerpo sientes esa energía?",
        "¿Qué sensación te produce?"
      ],
      preguntaExtra: "¿Surge algún movimiento que quieras realizar ahora o las dejas así como están?",
      color: C.terra
    },
    {
      num: "3ª",
      titulo: "Memoria pasada de tu YO",
      descripcion: "Elige la esfera que representa a tu YO del pasado — tu niño/a interior, la edad en la que se originó esta memoria.",
      preguntas: [
        "¿Dónde quieres ubicarla en la rueda?",
        "¿Qué sientes al colocarla ahí?",
        "¿En qué parte del cuerpo sientes esa energía?",
        "Mira a esa esfera desde tu YO actual — ¿qué surge?"
      ],
      preguntaExtra: "¿Surge algún movimiento que quieras realizar ahora o las dejas así como están?",
      indicacion: "Conecta con la edad en que se formó este patrón. ¿Qué necesitabas entonces que no llegó? Habla a esa esfera.",
      color: C.blue
    },
    {
      num: "4ª",
      titulo: "Memoria pasada del PROBLEMA",
      descripcion: "Elige la esfera que representa la memoria transgeneracional del problema — el ancestro o la historia familiar que está detrás de este conflicto.",
      preguntas: [
        "¿Dónde quieres ubicarla en la rueda?",
        "¿Qué sientes al colocarla ahí?",
        "¿Qué ocurrió con este ancestro o en esta línea del sistema?",
        "¿Hay alguna lealtad inconsciente que quieras honrar y soltar?"
      ],
      preguntaExtra: "¿Quieres hacer algún movimiento más o sientes que es una imagen resolutiva?",
      indicacion: "Observa la constelación completa de las 4 esferas. ¿Qué patrón ves? ¿Hay alguna esfera que quiera moverse?",
      color: C.sage
    }
  ];

  const NATALES_E = [
    {g:"☉\uFE0E",deg:202,grado:"22°"},{g:"☽\uFE0E",deg:292,grado:"22°"},
    {g:"☿\uFE0E",deg:205,grado:"25°"},{g:"♀\uFE0E",deg:198,grado:"18°"},
    {g:"♂\uFE0E",deg:39, grado:"09°"},{g:"♃\uFE0E",deg:343,grado:"13°"},
    {g:"♄\uFE0E",deg:247,grado:"07°"},{g:"♅\uFE0E",deg:257,grado:"19°"},
    {g:"♆\uFE0E",deg:273,grado:"03°"},{g:"♇\uFE0E",deg:187,grado:"07°"},
    {g:"☊\uFE0E",deg:20, grado:"20°"},{g:"⚷\uFE0E",deg:80, grado:"20°"},
    {g:"⚸\uFE0E",deg:170,grado:"20°"},
  ];

  // Calcula aspectos entre dos ángulos
  const calcAsp = (a,b) => {
    let diff=Math.abs(a-b); if(diff>180)diff=360-diff;
    if(diff<=10)              return {tipo:"conjunción", col:C.plum,  dash:"none"};
    if(Math.abs(diff-60)<=7) return {tipo:"sextil",     col:C.sage,  dash:"2,3"};
    if(Math.abs(diff-90)<=8) return {tipo:"cuadratura", col:C.terra, dash:"4,3"};
    if(Math.abs(diff-120)<=8)return {tipo:"trígono",    col:C.blue,  dash:"none"};
    if(Math.abs(diff-150)<=4)return {tipo:"quíncuncio", col:"#809070",dash:"5,2,2,2"};
    if(Math.abs(diff-180)<=10)return {tipo:"oposición", col:INK2,    dash:"none"};
    return null;
  };
  const xyToAngle = (x,y) => ((Math.atan2(y-CY,x-CX)*180/Math.PI)+90+360)%360;
  const angToSigno = (ang) => ["Aries","Tauro","Géminis","Cáncer","Leo","Virgo","Libra","Escorpio","Sagitario","Capricornio","Acuario","Piscis"][Math.floor(ang/30)%12];
  const angToCasa  = (ang) => Math.floor(ang/30)+1;

  // Drag handlers
  const startDrag = (idx,e) => {
    e.preventDefault();
    const svg=e.currentTarget.closest("svg");
    const rect=svg.getBoundingClientRect(), scale=SZ/rect.width;
    const cx2=e.touches?e.touches[0].clientX:e.clientX;
    const cy2=e.touches?e.touches[0].clientY:e.clientY;
    const pos=posiciones[idx]||{x:CX,y:CY};
    setDragging(idx);
    setDragOffset({x:(cx2-rect.left)*scale-pos.x, y:(cy2-rect.top)*scale-pos.y});
  };
  const onMove = (e) => {
    if(dragging===null)return; e.preventDefault();
    const svg=e.currentTarget, rect=svg.getBoundingClientRect(), scale=SZ/rect.width;
    const cx2=e.touches?e.touches[0].clientX:e.clientX;
    const cy2=e.touches?e.touches[0].clientY:e.clientY;
    const nx=Math.max(14,Math.min(SZ-14,(cx2-rect.left)*scale-dragOffset.x));
    const ny=Math.max(14,Math.min(SZ-14,(cy2-rect.top)*scale-dragOffset.y));
    setPosiciones(prev=>{const n=[...prev];n[dragging]={x:nx,y:ny};return n;});
  };
  const stopDrag=()=>setDragging(null);
  const handleSvgClick=(e)=>{
    // Posicionar si: hay esfera elegida para la ronda actual Y aún no está colocada
    if(!esferas[ronda]) return;
    // Si ya está colocada, permitir reposicionar con click
    const svg=e.currentTarget, rect=svg.getBoundingClientRect(), scale=SZ/rect.width;
    const x=(e.clientX-rect.left)*scale;
    const y=(e.clientY-rect.top)*scale;
    setPosiciones(prev=>{const n=[...prev];n[ronda]={x,y};return n;});
  };

  // Calcular todos los aspectos en superposición
  const getAspectos = () => {
    const res=[];
    posiciones.forEach((pos,i)=>{
      if(!pos||!esferas[i])return;
      const ang=xyToAngle(pos.x,pos.y);
      NATALES_E.forEach(pl=>{
        const asp=calcAsp(ang,pl.deg+(VIS_E[pl.deg]||0));
        if(asp)res.push({slot:i,esf:esferas[i],planeta:pl,asp,ang});
      });
      // aspecto entre esferas
      posiciones.forEach((pos2,j)=>{
        if(j<=i||!pos2||!esferas[j])return;
        const ang2=xyToAngle(pos2.x,pos2.y);
        const asp=calcAsp(ang,ang2);
        if(asp)res.push({slot:i,slot2:j,esf:esferas[i],esf2:esferas[j],asp,ang,ang2,entreEsferas:true});
      });
    });
    return res;
  };

  // Colores de slot
  const SLOT_COLS = [C.plum, C.terra, C.blue, C.sage];

  // ── RUEDA SVG ──────────────────────────────────────────────────────────────
  const Rueda = ({modo}) => (
    <svg viewBox={`0 0 ${SZ} ${SZ}`} width="100%"
      style={{display:"block",userSelect:"none",fontFamily:"'Noto Sans Symbols 2','Apple Symbols','Segoe UI Symbol',serif",
        cursor:esferas[ronda]&&!posiciones[ronda]?"crosshair":dragging!==null?"grabbing":"default"}}
      onClick={handleSvgClick}
      onMouseMove={onMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}
      onTouchMove={onMove} onTouchEnd={stopDrag}>

      <circle cx={CX} cy={CY} r={Rdeg_+3} fill={C.bg2} stroke="none"/>

      {/* Ticks */}
      {Array.from({length:360},(_,i)=>{
        const isMaj=i%30===0,isMed=i%5===0&&!isMaj;
        if(!isMaj&&!isMed&&i%2!==0)return null;
        const h=isMaj?SZ*.028:isMed?SZ*.016:SZ*.008;
        const p1=ptW(Rdeg_,i),p2=ptW(Rdeg_-h,i);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={INK} strokeWidth={isMaj?".9":isMed?".55":".3"}
          opacity={isMaj?"1":isMed?".55":".3"}/>;
      })}

      {/* Zodíaco */}
      <circle cx={CX} cy={CY} r={Rzod_} fill="none" stroke={INK} strokeWidth=".9"/>
      <circle cx={CX} cy={CY} r={Rzi_}  fill="none" stroke={INK} strokeWidth=".9"/>
      {Array.from({length:12},(_,i)=>{
        const p1=ptW(Rzod_,i*30),p2=ptW(Rzi_,i*30);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={INK} strokeWidth=".9"/>;
      })}
      {Array.from({length:72},(_,i)=>{
        if(i%6===0)return null; const isSub=i%2===0,h=isSub?SZ*.016:SZ*.009;
        const p1=ptW(Rzod_,i*5),p2=ptW(Rzod_-h,i*5);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={INK} strokeWidth={isSub?".5":".3"} opacity={isSub?".6":".35"}/>;
      })}
      {/* Sectores de signo con relleno pastel muy suave */}
      {Array.from({length:12},(_,i)=>{
        const d1=i*30,d2=d1+30;
        const s1=ptW(Rzod_,d1),e1=ptW(Rzod_,d2),s2=ptW(Rzi_,d2),e2=ptW(Rzi_,d1);
        return <path key={i}
          d={`M ${s1.x} ${s1.y} A ${Rzod_} ${Rzod_} 0 0 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${Rzi_} ${Rzi_} 0 0 0 ${e2.x} ${e2.y} Z`}
          fill={EL_FILL_E[i]} opacity=".07" stroke="none"/>;
      })}
      {SIGNS_E.map((g,i)=>{
        const mid=ptW((Rzod_+Rzi_)/2,i*30+15);
        return <text key={i} x={mid.x} y={mid.y+.5} textAnchor="middle" dominantBaseline="central"
          fontSize={SZ*.036} fill={EL_C_E[SIGN_EL_E[i]]} style={{fontVariantEmoji:"text"}}>{g}</text>;
      })}

      <circle cx={CX} cy={CY} r={Rzi_} fill={C.bg2} stroke="none"/>
      {Array.from({length:12},(_,i)=>{
        const isMaj=i%3===0,p1=ptW(Rzi_,i*30),p2=ptW(Rasi_,i*30);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={INK} strokeWidth={isMaj?".75":".38"} opacity={isMaj?".65":".3"}/>;
      })}
      {HN_E.map((n,i)=>{
        const pos=ptW((Rzi_*.98+Rzi_*.72)/2,i*30+15);
        return <text key={i} x={pos.x} y={pos.y+.5} textAnchor="middle" dominantBaseline="central"
          fontFamily="Inter,sans-serif" fontSize={SZ*.026} fill={INK2} opacity=".75">{n}</text>;
      })}
      <circle cx={CX} cy={CY} r={Rasi_} fill={C.bg2} stroke={INK} strokeWidth=".6" opacity=".4"/>

      {/* Red densa de aspectos natales — dentro del círculo interior, monocroma */}
      {(()=>{
        const ASPDEF=[
          {a:202,b:205},{a:202,b:198},{a:198,b:187},{a:202,b:187},
          {a:247,b:257},{a:257,b:273},{a:202,b:292},{a:205,b:292},
          {a:198,b:343},{a:187,b:343},{a:292,b:80},{a:202,b:247},
          {a:202,b:273},{a:292,b:39},{a:343,b:80},{a:170,b:20},
          {a:187,b:39},{a:202,b:80},{a:247,b:343},{a:292,b:170},{a:39,b:343},
        ];
        const calcT=(a,b)=>{let d=Math.abs(a-b);if(d>180)d=360-d;
          if(d<=10)return{w:".8",dash:"none",col:CONJ_E};
          if(Math.abs(d-180)<=10)return{w:".8",dash:"none",col:TENS_E};
          if(Math.abs(d-90)<=8)return{w:".7",dash:"none",col:TENS_E};
          if(Math.abs(d-120)<=8)return{w:".7",dash:"none",col:HARM_E};
          if(Math.abs(d-60)<=6)return{w:".5",dash:"none",col:HARM_E};
          if(Math.abs(d-150)<=4)return{w:".45",dash:"2.5,2",col:QUIN_E};
          return null;};
        return ASPDEF.map((asp,i)=>{
          const t=calcT(asp.a,asp.b);
          if(!t)return null;
          const p1=ptW(Rasi_-1,asp.a),p2=ptW(Rasi_-1,asp.b);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
            stroke={t.col} strokeWidth={t.w} strokeDasharray={t.dash} opacity=".7"/>;
        });
      })()}

      {/* Ejes */}
      {[{l:"AC",d:0},{l:"DC",d:180},{l:"MC",d:270},{l:"IC",d:90}].map(({l,d})=>{
        const p1=ptW(Rasi_-2,d),p2=ptW(Rzi_-1,d),tp=ptW(Rzod_+SZ*.030,d);
        return(<g key={l}>
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.plum} strokeWidth="1.1" opacity=".8"/>
          <text x={tp.x} y={tp.y} textAnchor="middle" dominantBaseline="central"
            fontFamily="Inter,sans-serif" fontSize={SZ*.022} fontWeight="700" fill={C.plum}>{l}</text>
        </g>);
      })}

      {/* Planetas natales */}
      {NATALES_E.map((pl,i)=>{
        const vd=pl.deg+(VIS_E[pl.deg]||0),pos=ptW(Rzod_+SZ*.038,vd);
        const tk1=ptW(Rzod_+1,pl.deg),tk2=ptW(Rzod_+SZ*.022,pl.deg);
        const hasOff=(VIS_E[pl.deg]||0)!==0;
        const lk1=ptW(Rzod_+SZ*.025,pl.deg),lk2=ptW(Rzod_+SZ*.032,vd);
        const opa = modo==="superposicion" ? ".4" : "1";
        return(<g key={i} opacity={opa}>
          <line x1={tk1.x} y1={tk1.y} x2={tk2.x} y2={tk2.y} stroke={INK2} strokeWidth=".8" opacity=".7"/>
          {hasOff&&<line x1={lk1.x} y1={lk1.y} x2={lk2.x} y2={lk2.y} stroke={INK} strokeWidth=".3" opacity=".4" strokeDasharray="2,2"/>}
          <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central"
            fontSize={SZ*.033} fill={C.plum} style={{fontVariantEmoji:"text"}}>{pl.g}</text>
          <text x={pos.x} y={pos.y+SZ*.030} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize={SZ*.017} fill={INK2} opacity=".85">{pl.grado}</text>
        </g>);
      })}

      {/* Líneas de aspecto en superposición */}
      {modo==="superposicion" && getAspectos().filter(a=>!a.entreEsferas).map((item,i)=>{
        const vd=item.planeta.deg+(VIS_E[item.planeta.deg]||0);
        const pp=ptW(Rzod_+SZ*.038,vd);
        const ep=posiciones[item.slot];
        if(!ep)return null;
        const ac=ASP_COL[item.asp.tipo]||INK2;
        return <line key={i} x1={ep.x} y1={ep.y} x2={pp.x} y2={pp.y}
          stroke={ac} strokeWidth="1" strokeDasharray={item.asp.dash} opacity=".7"/>;
      })}
      {/* Líneas entre esferas */}
      {modo==="superposicion" && getAspectos().filter(a=>a.entreEsferas).map((item,i)=>{
        const p1=posiciones[item.slot],p2=posiciones[item.slot2];
        if(!p1||!p2)return null;
        const ac=ASP_COL[item.asp.tipo]||INK2;
        return <line key={`ee${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke={ac} strokeWidth=".9" strokeDasharray={item.asp.dash} opacity=".6"/>;
      })}

      {/* Esferas posicionadas */}
      {posiciones.map((pos,i)=>{
        if(!pos||!esferas[i])return null;
        const e=esferas[i], isDrag=dragging===i;
        const col=SLOT_COLS[i];
        const isActive=modo==="ronda"&&i===ronda;
        return(<g key={i} style={{cursor:isDrag?"grabbing":"grab"}}
          onMouseDown={ev=>startDrag(i,ev)} onTouchStart={ev=>startDrag(i,ev)}>
          <defs>
            <radialGradient id={`rg_${i}`} cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
              <stop offset="40%" stopColor={e.colorHex} stopOpacity="0.85"/>
              <stop offset="100%" stopColor={e.colorHex} stopOpacity="1"/>
            </radialGradient>
          </defs>
          <circle cx={pos.x} cy={pos.y} r={isDrag?17:15}
            fill={`url(#rg_${i})`}
            stroke={isDrag?"rgba(255,255,255,.6)":"none"}
            strokeWidth={isDrag?1.5:0}
            style={{filter:isDrag?`drop-shadow(0 2px 8px ${e.colorHex})`:`drop-shadow(0 1px 4px ${e.colorHex}88)`}}/>
          {/* Número slot muy pequeño debajo */}
          <text x={pos.x} y={pos.y+24} textAnchor="middle"
            fontFamily="Inter,sans-serif" fontSize="7" fill={col} fontWeight="700" opacity=".65">
            {["I","II","III","IV"][i]}
          </text>
        </g>);
      })}

      {/* Hint */}
      {selector && !posiciones[ronda] && (
        <text x={CX} y={SZ-8} textAnchor="middle" fontFamily="Inter,sans-serif"
          fontSize="9" fill={C.plum} opacity=".55">
          Haz clic en la rueda para posicionar · {RONDAS[ronda].titulo}
        </text>
      )}
      <circle cx={CX} cy={CY} r={SZ*.055} fill={C.bg2} stroke={INK} strokeWidth=".6" opacity=".5"/>
    </svg>
  );

  // ── PANTALLA: INTRO ────────────────────────────────────────────────────────
  if(fase==="intro") return (
    <div style={{padding:"24px 20px"}}>
      <div style={{...card,textAlign:"center",padding:"32px 28px",marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:C.plum,marginBottom:12}}>Protocolo clínico · Clase 26 · Enzo De Paola</div>
        <div style={{fontSize:22,fontWeight:700,letterSpacing:"-.02em",color:C.text,marginBottom:16}}>Las Resoluciones del Código Natal</div>
        <p style={{fontSize:13,color:C.sub,lineHeight:1.8,maxWidth:520,margin:"0 auto 10px",fontWeight:300}}>
          Las Esferas Internas son imágenes que proyectan todo lo que existe en el inconsciente, donde ni tiempo ni espacio producen límites. Los distintos <strong style={{color:C.text}}>movimientos</strong> que se van manifestando generan modificaciones, desbloqueos, reconciliaciones y el reordenamiento del amor.
        </p>
        <p style={{fontSize:13,color:C.sub,lineHeight:1.8,maxWidth:520,margin:"0 auto 24px",fontWeight:300}}>
          Se trabaja con <strong style={{color:C.plum}}>4 esferas en orden</strong>. Cada una tiene su pregunta. Al final se superponen con la carta natal para revelar la nueva constelación de aspectos.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,maxWidth:480,margin:"0 auto 28px",textAlign:"left"}}>
          {RONDAS.map((r,i)=>(
            <div key={i} style={{background:C.bg,borderRadius:8,padding:"12px 14px",borderLeft:`3px solid ${r.color}`}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:r.color,marginBottom:4}}>{r.num} Esfera</div>
              <div style={{fontSize:13,fontWeight:600,color:C.text}}>{r.titulo}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>{setFase("ronda");setRonda(0);}} style={{padding:"12px 32px",fontSize:12,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",background:C.plum,color:"#fff",border:"none",borderRadius:4,cursor:"pointer"}}>
          Comenzar protocolo →
        </button>
      </div>
    </div>
  );

  // ── PANTALLA: RONDA (1-4 esferas) ─────────────────────────────────────────
  if(fase==="ronda") {
    const r = RONDAS[ronda];
    const esfActual = esferas[ronda];
    const posActual = posiciones[ronda];

    return(
      <div style={{padding:"24px 20px"}}>
        {/* Progress */}
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {RONDAS.map((_,i)=>(
            <div key={i} style={{flex:1,height:3,borderRadius:2,
              background:i<ronda?C.plum:i===ronda?C.plum:C.border,
              opacity:i===ronda?1:i<ronda?0.7:0.3}}/>
          ))}
        </div>

        {/* Header ronda */}
        <div style={{...card,marginBottom:12,borderLeft:`3px solid ${r.color}`}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:r.color,marginBottom:6}}>{r.num} Esfera</div>
          <div style={{fontSize:17,fontWeight:700,color:C.text,marginBottom:8}}>{r.titulo}</div>
          <p style={{fontSize:13,color:C.sub,fontWeight:300,lineHeight:1.65,marginBottom:esfActual?12:0}}>{r.descripcion}</p>

          {/* Esfera seleccionada */}
          {esfActual && (
            <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:C.bg,borderRadius:8,marginBottom:12}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:esfActual.colorHex,
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontFamily:"serif",fontSize:14,color:"rgba(255,255,255,.92)",fontVariantEmoji:"text"}}>{esfActual.planeta}</span>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:C.text}}>{esfActual.nombre} <span style={{fontWeight:400,color:C.muted,fontSize:11}}>— {esfActual.colorName}</span></div>
                <div style={{fontSize:11,color:C.muted,fontWeight:300,marginTop:2}}>{esfActual.cli.split(".")[0]}.</div>
              </div>
              <button onClick={()=>{setEsferas(prev=>{const n=[...prev];n[ronda]=null;return n;});setPosiciones(prev=>{const n=[...prev];n[ronda]=null;return n;});}}
                style={{marginLeft:"auto",border:"none",background:"none",color:C.muted,cursor:"pointer",fontSize:12,flexShrink:0}}>cambiar</button>
            </div>
          )}

          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {!esfActual && (
              <button onClick={()=>setSelector(true)}
                style={{padding:"9px 18px",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
                  background:r.color,color:"#fff",border:"none",borderRadius:4,cursor:"pointer"}}>
                Elegir esfera
              </button>
            )}
            {esfActual && !posActual && (
              <div style={{padding:"9px 14px",fontSize:12,fontWeight:500,color:r.color,
                background:`${r.color}10`,borderRadius:4,border:`1px dashed ${r.color}55`}}>
                ↓ Haz clic en la rueda para posicionar la esfera
              </div>
            )}
            {esfActual && posActual && ronda < 3 && (
              <button onClick={()=>{setRonda(ronda+1);setSelector(false);}}
                style={{padding:"9px 18px",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
                  background:C.plum,color:"#fff",border:"none",borderRadius:4,cursor:"pointer"}}>
                Siguiente esfera →
              </button>
            )}
            {esfActual && posActual && ronda === 3 && (
              <button onClick={()=>setFase("superposicion")}
                style={{padding:"9px 18px",fontSize:12,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
                  background:C.plum,color:"#fff",border:"none",borderRadius:4,cursor:"pointer"}}>
                Superponer carta natal →
              </button>
            )}
            {ronda>0 && <button onClick={()=>{setRonda(ronda-1);setSelector(false);}}
              style={{padding:"9px 14px",fontSize:11,background:"transparent",border:`1px solid ${C.border}`,borderRadius:4,cursor:"pointer",color:C.muted}}>← Anterior</button>}
          </div>
        </div>

        {/* Preguntas de la ronda */}
        {esfActual && (
          <div style={{...card,marginBottom:12}}>
            <div style={label}>Preguntas terapéuticas</div>
            {r.preguntas.map((p,i)=>(
              <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:i<r.preguntas.length-1?`1px solid ${C.border}`:"none"}}>
                <span style={{color:r.color,fontWeight:700,flexShrink:0,fontSize:13}}>{i+1}.</span>
                <span style={{fontSize:13,color:C.text,lineHeight:1.65}}>{p}</span>
              </div>
            ))}
            {r.preguntaExtra && (
              <div style={{marginTop:14,padding:"10px 14px",background:`${r.color}10`,borderRadius:8,border:`1px solid ${r.color}28`}}>
                <p style={{fontSize:13,color:r.color,fontWeight:600,fontStyle:"italic",margin:0}}>→ {r.preguntaExtra}</p>
              </div>
            )}
            {r.indicacion && (
              <div style={{marginTop:10,padding:"10px 14px",background:C.bg,borderRadius:8}}>
                <p style={{fontSize:12,color:C.sub,fontWeight:300,lineHeight:1.65,margin:0,fontStyle:"italic"}}>{r.indicacion}</p>
              </div>
            )}
            {posActual && (
              <div style={{marginTop:12,padding:"8px 12px",background:C.plumSoft,borderRadius:6}}>
                <span style={{fontSize:12,color:C.plum,fontWeight:500}}>
                  Posicionada en {angToSigno(xyToAngle(posActual.x,posActual.y))} · Casa {angToCasa(xyToAngle(posActual.x,posActual.y))}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Selector de esfera */}
        {selector && !esfActual && (
          <div style={{...card,marginBottom:12}}>
            <div style={label}>Elige la esfera · {r.titulo}</div>
            {(()=>{
              // IDs ya elegidos en rondas anteriores — no se pueden repetir
              const usadas = esferas.filter(Boolean).map(e=>e.id);
              const disponibles = DEMO.esferas.filter(e=>!usadas.includes(e.id));
              return (
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {disponibles.map(e=>(
                <div key={e.id}
                  onClick={()=>{setEsferas(prev=>{const n=[...prev];n[ronda]=e;return n;});setSelector(false);}}
                  title={e.num}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",
                    padding:"14px 8px",cursor:"pointer",borderRadius:10,
                    background:C.bg,border:`1px solid ${C.border}`,
                    transition:"transform .15s,box-shadow .15s"}}
                  onMouseEnter={ev=>{ev.currentTarget.style.transform="scale(1.08)";ev.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.12)";}}
                  onMouseLeave={ev=>{ev.currentTarget.style.transform="scale(1)";ev.currentTarget.style.boxShadow="none";}}>
                  <svg width="44" height="44" viewBox="0 0 44 44">
                    <defs>
                      <radialGradient id={`g_${e.id}`} cx="38%" cy="32%" r="65%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.55"/>
                        <stop offset="45%" stopColor={e.colorHex} stopOpacity="0.9"/>
                        <stop offset="100%" stopColor={e.colorHex} stopOpacity="1"/>
                      </radialGradient>
                      <filter id={`s_${e.id}`}>
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={e.colorHex} floodOpacity="0.45"/>
                      </filter>
                    </defs>
                    <circle cx="22" cy="22" r="19" fill={`url(#g_${e.id})`} filter={`url(#s_${e.id})`}/>
                  </svg>
                </div>
              ))}
            </div>
              );
            })()}
          </div>
        )}

        {/* Rueda */}
        <div style={{background:C.bg2,borderRadius:12,border:`1px solid ${C.border}`,padding:8,touchAction:"none",maxWidth:420,margin:"0 auto"}}>
          <Rueda modo="ronda"/>
        </div>

        {/* Leyenda esferas activas */}
        <div style={{display:"flex",gap:12,marginTop:10,flexWrap:"wrap"}}>
          {posiciones.map((pos,i)=>{
            if(!pos||!esferas[i])return null;
            return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:C.sub}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:esferas[i].colorHex,border:`1.5px solid ${esferas[i].colorHex}`}}/>
                <span style={{color:SLOT_COLS[i],fontWeight:600}}>{["YO","Problema","YO₀","Prob₀"][i]}</span>
                <span style={{color:C.muted}}>— {esferas[i].nombre}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── PANTALLA: SUPERPOSICIÓN ────────────────────────────────────────────────
  if(fase==="superposicion") {
    const aspectos = getAspectos();
    return(
      <div style={{padding:"24px 20px"}}>
        <div style={{...card,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:C.plum,marginBottom:4}}>Superposición con carta natal</div>
              <div style={{fontSize:16,fontWeight:700,color:C.text}}>Nueva constelación de aspectos</div>
            </div>
            <button onClick={()=>{setFase("ronda");setRonda(3);}}
              style={{padding:"8px 14px",fontSize:11,background:"transparent",border:`1px solid ${C.border}`,borderRadius:4,cursor:"pointer",color:C.muted}}>← Editar esferas</button>
          </div>
        </div>

        {/* Rueda superposición */}
        <div style={{background:C.bg2,borderRadius:12,border:`1px solid ${C.border}`,padding:8,marginBottom:12,touchAction:"none",maxWidth:460,margin:"0 auto 12px"}}>
          <Rueda modo="superposicion"/>
        </div>

        {/* Leyenda */}
        <div style={{display:"flex",gap:12,marginBottom:14,flexWrap:"wrap"}}>
          {[["☌ Conjunción",C.plum,"none"],["△ Trígono",C.blue,"none"],["□ Cuadratura",C.terra,"4,3"],["✶ Sextil",C.sage,"2,3"],["☍ Oposición",INK2,"none"]].map(([l,c,d])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.muted}}>
              <svg width="16" height="5"><line x1="0" y1="2.5" x2="16" y2="2.5" stroke={c} strokeWidth="1.2" strokeDasharray={d}/></svg>{l}
            </div>
          ))}
        </div>

        {/* Resumen posiciones */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:14}}>
          {esferas.map((e,i)=>{
            if(!e||!posiciones[i])return null;
            const ang=xyToAngle(posiciones[i].x,posiciones[i].y);
            return(
              <div key={i} style={{...card,margin:0,borderLeft:`3px solid ${e.colorHex}`}}>
                <div style={{fontSize:10,fontWeight:700,color:SLOT_COLS[i],letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>{["YO","Problema","YO del pasado","Prob. del pasado"][i]}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontFamily:"serif",fontSize:16,color:e.colorHex,fontVariantEmoji:"text"}}>{e.planeta}</span>
                  <span style={{fontSize:13,fontWeight:600,color:C.text}}>{e.nombre}</span>
                </div>
                <div style={{fontSize:12,color:C.plum,marginTop:4,fontWeight:500}}>{angToSigno(ang)} · Casa {angToCasa(ang)}</div>
              </div>
            );
          })}
        </div>

        {/* ── INTERPRETACIÓN CLÍNICA DE LA SUPERPOSICIÓN ── */}
        {(()=>{
          const PNAMES = {
            "☉︎":"Sol","☽︎":"Luna","☿︎":"Mercurio","♀︎":"Venus",
            "♂︎":"Marte","♃︎":"Júpiter","♄︎":"Saturno","♅︎":"Urano",
            "♆︎":"Neptuno","♇︎":"Plutón","☊︎":"Nodo N.","⚷︎":"Quirón","⚸︎":"Lilith"
          };
          const SLOT_L = ["del YO","del Problema","del YO pasado","del Problema pasado"];
          const SLOT_S = ["YO","Problema","YO pasado","Prob. pasado"];

          // Definición de cada aspecto según la base de datos de apuntes
          const ADEFS = {
            "conjunción":{"sim":"☌","mov":"Fusión","din":"Fusión e identificación entre energías",
              "desc":"No hay distancia entre los arquetipos implicados. La energía de la esfera y el planeta natal se funden — lo que esta esfera representa es inseparable de lo que ese planeta ya porta en el sistema familiar.",
              "preg":"¿Dónde no hay separación posible y me confundo con el otro?",
              "riesgo":"Puede anular la diferenciación entre el consultante y el sistema."},
            "trígono":{"sim":"△","mov":"Fluidez","din":"Facilidad heredada que puede ser zona ciega",
              "desc":"Facilidad heredada del linaje. La energía fluye sin resistencia en este territorio — hay un recurso disponible, pero puede estar siendo dado por sentado sin activarse conscientemente.",
              "preg":"¿Dónde me acomodo y dejo de crecer por exceso de facilidad?",
              "riesgo":"Estancamiento sistémico por confort heredado."},
            "cuadratura":{"sim":"□","mov":"Fricción","din":"Retos repetidos y conflictos heredados",
              "desc":"Conflictos no resueltos en el sistema familiar que se repiten. La esfera encuentra resistencia activa — hay un patrón de lucha o bloqueo en este territorio que el consultante porta del linaje.",
              "preg":"¿Cómo acepto este desafío sin quedarme atrapado en la lucha?",
              "riesgo":"Repetición del mismo conflicto en distintas formas y generaciones."},
            "oposición":{"sim":"☍","mov":"Polarización","din":"Conflicto entre dos polos que buscan integración",
              "desc":"Conflicto entre dos polos opuestos que el sistema ha mantenido separados. El consultante ha estado oscilando entre ellos sin poder integrar ninguno de los dos extremos.",
              "preg":"¿Cómo puedo integrar estos dos extremos en mi vida sin excluir ninguno?",
              "riesgo":"Proyección del conflicto en relaciones externas."},
            "sextil":{"sim":"✶","mov":"Oportunidad","din":"Talento disponible que puede estancarse",
              "desc":"Talento disponible en el linaje que puede estancarse si no se activa conscientemente. Hay una puerta abierta — el sistema ha dejado un recurso accesible si el consultante elige usarlo.",
              "preg":"¿Cómo puedo usar este recurso sin acomodarme o bloquear el flujo?",
              "riesgo":"Pacto invisible que mantiene el talento dormido."},
            "quíncuncio":{"sim":"⚻","mov":"Reajuste","din":"Desajuste interno que exige reajuste",
              "desc":"Incomodidad persistente que obliga a modificar actitudes. La esfera y el planeta natal no se entienden directamente — algo necesita ser reajustado antes de que el movimiento pueda fluir.",
              "preg":"¿Qué necesito reajustar para recuperar el equilibrio?",
              "riesgo":"Puede anular la diferenciación si no se trabaja el ajuste."},
          };

          // Lectura contextual específica según planeta + tipo de aspecto
          const ctxKey = (planNom, tipo) => {
            const K = {
              "Sol-conjunción":"La esfera se funde con la identidad y la figura paterna del sistema. Lo que se trabaja hoy toca directamente quién es el consultante y de dónde viene.",
              "Luna-conjunción":"La esfera se funde con la memoria materna y el vínculo primario. El conflicto que se trabaja está tejido con las emociones más antiguas del sistema.",
              "Saturno-conjunción":"La esfera toca los mandatos del linaje. Un abuelo o figura de autoridad está muy presente en este movimiento — hay una lealtad invisible que honrar.",
              "Plutón-conjunción":"La esfera alcanza la capa más profunda: secretos del sistema, poder en la sombra, transformaciones no completadas. Lo que debía morir y no murió.",
              "Venus-conjunción":"La esfera resuena con el linaje femenino y las creencias amorosas. Lo que se trabaja tiene raíces en cómo se aprendió a dar y recibir amor en el sistema.",
              "Quirón-conjunción":"La esfera toca la herida ancestral directamente. El síndrome del impostor o la herida de abandono del linaje está muy activa hoy.",
              "Mercurio-conjunción":"La esfera se funde con la comunicación del sistema. Algo que no pudo ser dicho o transmitido en el linaje está presente en este conflicto.",
              "Marte-conjunción":"La esfera toca la fuerza vital y el linaje masculino. La rabia o la acción bloqueada del sistema buscan expresión a través de este movimiento.",
              "Luna-cuadratura":"Hay fricción entre la emoción del consultante y la memoria materna. La rabia o tristeza heredadas buscan salida — el cuerpo lo nota.",
              "Sol-cuadratura":"La identidad propia choca con la estructura del linaje. Un mandato de reconocimiento o poder presiona — la dignidad propia está en juego.",
              "Saturno-cuadratura":"La estructura y los mandatos generacionales bloquean el movimiento. Hay un deber invisible que frena lo que el consultante quiere hacer.",
              "Plutón-cuadratura":"La transformación encuentra resistencia profunda. Algo que debería morir y regenerarse se resiste — hay miedo al cambio en el sistema.",
              "Quirón-cuadratura":"La herida ancestral genera fricción con este movimiento. El impostor interno se activa fuertemente cuando se intenta avanzar aquí.",
              "Venus-cuadratura":"Los vínculos y el valor propio entran en conflicto. Las creencias amorosas del linaje bloquean la relación del consultante con sus propios recursos.",
              "Sol-trígono":"La identidad fluye en armonía con este movimiento. El sistema paterno ofrece un recurso disponible — hay una dignidad heredada que puede activarse.",
              "Luna-trígono":"La memoria emocional está disponible para sanar. El sistema materno ofrece un camino fluido hacia este territorio sin resistencia.",
              "Quirón-trígono":"La herida ancestral puede ser vista y honrada sin resistencia. Este es un momento de acceso suave a la capacidad sanadora del consultante.",
              "Saturno-trígono":"El orden y la responsabilidad del linaje fluyen como recurso. Hay una estructura disponible en el sistema que puede sostener este movimiento.",
              "Sol-oposición":"El YO del consultante y la imagen paterna del sistema se polarizan. Dos formas de ser conviven sin integrarse — el reconocimiento está en juego.",
              "Luna-oposición":"La emoción y la razón, lo materno y lo social están en extremos. El sistema ha aprendido a oscilar entre ellos sin encontrar el centro.",
              "Plutón-oposición":"El poder y la impotencia están en polos opuestos. Lo que se guarda y lo que se muestra — el sistema ha dividido estos territorios con fuerza.",
              "Sol-sextil":"Hay una oportunidad de integrar la identidad propia con el legado del sistema. Un recurso de dignidad está disponible si se activa conscientemente.",
              "Luna-sextil":"La memoria emocional ofrece una puerta de acceso disponible. El consultante tiene un talento emocional del linaje esperando ser reconocido.",
            };
            return K[`${planNom}-${tipo}`] || null;
          };

          if(aspectos.length===0) return (
            <div style={card}>
              <div style={label}>Lectura de la superposición</div>
              <p style={{fontSize:13,color:C.muted,fontStyle:"italic",fontWeight:300}}>
                Las esferas no forman aspectos exactos en estas posiciones. Ajusta su ubicación en la rueda para explorar diferentes ángulos del movimiento.
              </p>
            </div>
          );

          const aspAct  = aspectos.filter(a=>!a.entreEsferas && ["conjunción","cuadratura","oposición"].includes(a.asp.tipo));
          const aspRec  = aspectos.filter(a=>!a.entreEsferas && ["trígono","sextil","quíncuncio"].includes(a.asp.tipo));
          const aspEE   = aspectos.filter(a=>a.entreEsferas);

          const BallSVG = ({color,size=22}) => (
            <svg width={size} height={size} viewBox="0 0 24 24" style={{flexShrink:0}}>
              <defs><radialGradient id={`bg${color.replace("#","")}`} cx="38%" cy="32%" r="65%">
                <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
                <stop offset="45%" stopColor={color} stopOpacity="0.88"/>
                <stop offset="100%" stopColor={color} stopOpacity="1"/>
              </radialGradient></defs>
              <circle cx="12" cy="12" r="10" fill={`url(#bg${color.replace("#","")})`}
                style={{filter:`drop-shadow(0 1px 3px ${color}88)`}}/>
            </svg>
          );

          const AspRow = ({item, idx, showFull=true}) => {
            const def = ADEFS[item.asp.tipo] || {};
            const planNom = PNAMES[item.planeta?.g] || "";
            const ctx = ctxKey(planNom, item.asp.tipo);
            return (
              <div style={{padding:"16px 0",borderBottom:idx>0?`1px solid ${C.border}`:"none"}}>
                {/* Cabecera */}
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                  <BallSVG color={item.esf.colorHex}/>
                  <span style={{fontSize:10,color:SLOT_COLS[item.slot],fontWeight:700,
                    textTransform:"uppercase",letterSpacing:".08em"}}>{SLOT_S[item.slot]}</span>
                  <span style={{fontSize:14,fontWeight:700,color:C.text}}>{def.sim} {item.asp.tipo}</span>
                  <span style={{fontFamily:"'Noto Sans Symbols 2',serif",fontSize:15,color:INK,
                    style:{fontVariantEmoji:"text"}}}>{item.planeta?.g}</span>
                  <span style={{fontSize:13,fontWeight:600,color:C.text}}>{planNom}</span>
                  <span style={{fontSize:10,color:C.muted,marginLeft:"auto"}}>{item.planeta?.grado}</span>
                </div>
                {/* Badge movimiento */}
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                  <span style={{fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:3,
                    background:C.plumSoft,color:C.plum,letterSpacing:".06em",textTransform:"uppercase"}}>
                    {def.mov}
                  </span>
                  <span style={{fontSize:12,color:C.sub,fontWeight:300,fontStyle:"italic"}}>{def.din}</span>
                </div>
                {showFull && <>
                  {/* Descripción sistémica */}
                  <p style={{fontSize:13,color:C.sub,lineHeight:1.8,fontWeight:300,marginBottom:ctx?10:0}}>
                    {def.desc}
                  </p>
                  {/* Lectura contextual si existe */}
                  {ctx && (
                    <div style={{background:C.bg,borderLeft:`2px solid ${C.plum}`,
                      borderRadius:"0 6px 6px 0",padding:"10px 14px",marginBottom:10}}>
                      <p style={{fontSize:13,color:C.text,lineHeight:1.75,margin:0,fontStyle:"italic"}}>{ctx}</p>
                    </div>
                  )}
                  {/* Pregunta terapéutica */}
                  <div style={{background:C.plumSoft,borderRadius:6,padding:"9px 12px",marginBottom:6}}>
                    <span style={{fontSize:10,fontWeight:700,color:C.plum,
                      letterSpacing:".1em",textTransform:"uppercase",marginRight:8}}>Pregunta terapéutica</span>
                    <span style={{fontSize:12,color:C.plum,fontStyle:"italic"}}>{def.preg}</span>
                  </div>
                  {/* Riesgo */}
                  <div style={{fontSize:11,color:C.muted,fontWeight:300}}>
                    <span style={{fontWeight:600,color:C.terra}}>Riesgo sistémico: </span>{def.riesgo}
                  </div>
                </>}
              </div>
            );
          };

          return (<div>
            {/* Aspectos de activación */}
            {aspAct.length>0 && (
              <div style={{...card,marginBottom:12}}>
                <div style={label}>Aspectos de activación — el sistema responde con fuerza</div>
                {aspAct.map((item,i)=><AspRow key={i} item={item} idx={i} showFull={true}/>)}
              </div>
            )}

            {/* Aspectos de recurso */}
            {aspRec.length>0 && (
              <div style={{...card,marginBottom:12}}>
                <div style={label}>Aspectos de recurso — lo disponible en el linaje</div>
                {aspRec.map((item,i)=><AspRow key={i} item={item} idx={i} showFull={false}/>)}
              </div>
            )}

            {/* Aspectos entre esferas */}
            {aspEE.length>0 && (
              <div style={{...card,marginBottom:12}}>
                <div style={label}>Relación entre esferas — la constelación interna</div>
                <p style={{fontSize:12,color:C.sub,fontWeight:300,lineHeight:1.65,marginBottom:12}}>
                  Los aspectos entre las propias esferas revelan cómo se relacionan el YO, el problema y las memorias del pasado entre sí.
                </p>
                {aspEE.map((item,i)=>{
                  const def = ADEFS[item.asp.tipo] || {};
                  return(
                    <div key={i} style={{padding:"10px 0",borderBottom:i<aspEE.length-1?`1px solid ${C.border}`:"none",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                      <BallSVG color={item.esf.colorHex} size={20}/>
                      <span style={{fontSize:10,color:SLOT_COLS[item.slot],fontWeight:700}}>{SLOT_S[item.slot]}</span>
                      <span style={{fontSize:13,fontWeight:700,color:C.text}}>{def.sim} {item.asp.tipo}</span>
                      <BallSVG color={item.esf2.colorHex} size={20}/>
                      <span style={{fontSize:10,color:SLOT_COLS[item.slot2],fontWeight:700}}>{SLOT_S[item.slot2]}</span>
                      <span style={{fontSize:12,color:C.sub,fontWeight:300,flexBasis:"100%",paddingLeft:28}}>{def.din} — {def.desc}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>);
        })()}
        {/* Anclajes */}
        <div style={{...card,background:C.plumSoft,border:`1px solid rgba(61,43,74,.15)`,marginTop:4}}>
          <div style={label}>Anclajes de resolución · 21 días · 3 veces al día</div>
          <p style={cardText}>Invita al consultante a realizar un dibujo representativo de la constelación. Los aspectos emergentes y la posición de las esferas revelan el movimiento interno disponible en este momento. El trabajo continúa durante 21 días con el anclaje elegido.</p>
          <div style={{marginTop:12}}>
            <div style={label}>Notas de sesión</div>
            <textarea placeholder="¿Qué esferas eligió? ¿Dónde las colocó? ¿Qué aspectos surgieron? ¿Hubo movimientos espontáneos? ¿Qué anclaje se acordó?..."
              style={{width:"100%",minHeight:90,fontFamily:"Inter,sans-serif",fontSize:13,color:C.text,
                lineHeight:1.8,background:"rgba(255,255,255,.6)",border:`1px solid rgba(61,43,74,.15)`,
                borderRadius:8,padding:12,outline:"none",resize:"vertical",fontWeight:300}}/>
          </div>
        </div>
      </div>
    );
  }

  return null;
}


// ── SHARED STYLES ─────────────────────────────────────────────────────────────
const card={background:C.bg2,border:`1px solid ${C.border}`,borderRadius:12,padding:22,marginBottom:12,boxShadow:'0 1px 4px rgba(0,0,0,.04)'};
const label={fontSize:10,fontWeight:700,letterSpacing:'.16em',textTransform:'uppercase',color:C.muted,marginBottom:8,display:'block'};
const cardText={fontSize:13,color:C.sub,lineHeight:1.8,fontWeight:300};
const td={fontSize:13,padding:'9px 8px',borderBottom:`1px solid ${C.border}`,color:C.sub,lineHeight:1.5,fontWeight:300};

// ── ICON ──────────────────────────────────────────────────────────────────────
const Ico=({n,s=15,c="currentColor"})=>{
  const d={
    back:<><line x1="19" y1="12" x2="5" y2="12" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><polyline points="12 19 5 12 12 5" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    chart:<><line x1="18" y1="20" x2="18" y2="10" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="20" x2="12" y2="4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="6" y1="20" x2="6" y2="14" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke={c} strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth="1.5"/></>,
    layers:<><polygon points="12 2 2 7 12 12 22 7 12 2" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><polyline points="2 17 12 22 22 17" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><polyline points="2 12 12 17 22 12" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></>,
    heart:<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>,
    ring:<><circle cx="12" cy="12" r="4" fill="none" stroke={c} strokeWidth="1.5"/><path d="M3 9s3 2 9 2 9-2 9-2" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M3 15s3-2 9-2 9 2 9 2" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
    body:<><circle cx="12" cy="5" r="2" fill="none" stroke={c} strokeWidth="1.5"/><path d="M12 7v6M9 9h6M9 20l3-7 3 7" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    gear:<><circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke={c} strokeWidth="1.5"/></>,
    file:<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></>,
    circle:<><circle cx="12" cy="12" r="10" fill="none" stroke={c} strokeWidth="1.5"/><circle cx="12" cy="12" r="3" fill={c}/></>,
    link:<><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    target:<><circle cx="12" cy="12" r="9" fill="none" stroke={c} strokeWidth="1.5"/><circle cx="12" cy="12" r="4.5" fill="none" stroke={c} strokeWidth="1.5"/><circle cx="12" cy="12" r="1.2" fill={c}/></>,
    star:<path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.8 6 20.5l1.3-6.6L2.5 9.4l6.6-.8z" fill="none" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>,
    orbit:<><circle cx="12" cy="12" r="2.5" fill={c}/><ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke={c} strokeWidth="1.3" transform="rotate(30 12 12)"/><circle cx="21" cy="9" r="1.4" fill={c}/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none">{d[n]||null}</svg>;
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const css=`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased}

/* LANDING */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:18px 48px;background:rgba(240,238,235,.92);backdrop-filter:blur(12px);border-bottom:1px solid ${C.border}}
.logo{font-size:14px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${C.text}}
.logo-sub{font-size:9px;color:${C.muted};letter-spacing:.18em;text-transform:uppercase;display:block;margin-top:-2px;font-weight:400}
.nav-links{display:flex;gap:28px}
.nav-lnk{font-size:13px;color:${C.muted};cursor:pointer;border:none;background:none;font-weight:400}
.nav-lnk:hover{color:${C.text}}
.nav-cta{font-size:12px;font-weight:700;padding:9px 22px;background:${C.plum};color:#fff;border:none;border-radius:4px;cursor:pointer;letter-spacing:.06em;text-transform:uppercase}
.nav-cta:hover{opacity:.88}

/* HERO */
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:100px 80px 80px;gap:80px;max-width:1180px;margin:0 auto}
.hero-eyebrow{font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${C.plum};margin-bottom:20px;opacity:.9}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(46px,5.6vw,72px);font-weight:500;line-height:1.05;letter-spacing:-.01em;margin-bottom:22px;color:${C.text}}
.hero-title em{font-style:italic;font-weight:400;color:${C.plum}}
.hero-sub{font-size:16px;font-weight:300;color:${C.sub};line-height:1.75;max-width:400px;margin-bottom:36px}
.hero-actions{display:flex;gap:12px;align-items:center}
.btn-primary{font-size:12px;font-weight:700;padding:13px 28px;background:${C.plum};color:#fff;border:none;border-radius:4px;cursor:pointer;letter-spacing:.08em;text-transform:uppercase}
.btn-primary:hover{opacity:.88}
.btn-outline{font-size:12px;font-weight:600;padding:13px 28px;background:transparent;color:${C.text};border:1px solid ${C.borderMd};border-radius:4px;cursor:pointer;letter-spacing:.06em}
.btn-outline:hover{border-color:${C.plum};color:${C.plum}}
.hero-visual{display:flex;align-items:center;justify-content:center;position:relative}
.hero-wheel-wrap{background:${C.bg2};border-radius:20px;border:1px solid ${C.border};padding:20px;box-shadow:0 8px 40px rgba(0,0,0,.07);position:relative;transition:transform .25s,box-shadow .25s}
.hero-wheel-wrap:hover{transform:translateY(-3px);box-shadow:0 14px 50px rgba(61,43,74,.14)}
.hero-wheel-hint{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:${C.plum};padding:6px 14px;border-radius:20px;opacity:0;transition:opacity .25s;white-space:nowrap;box-shadow:0 4px 14px rgba(61,43,74,.3)}
.hero-wheel-wrap:hover .hero-wheel-hint{opacity:1}
.hero-note{font-size:11px;color:${C.muted};margin-top:14px;font-weight:300}

/* DIVIDER */
.divider-line{border:none;border-top:1px solid ${C.border};margin:0 80px}

/* SECTIONS */
.section{max-width:1100px;margin:0 auto;padding:80px 80px}
.sec-eyebrow{font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:${C.plum};margin-bottom:12px;opacity:.9}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,50px);font-weight:500;letter-spacing:-.005em;margin-bottom:44px;color:${C.text};line-height:1.08}
.sec-title em{font-style:italic;font-weight:400;color:${C.plum}}

/* HOW */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};border-radius:12px;overflow:hidden}
.step{padding:28px 24px;background:${C.bg2}}
.step-n{font-size:10px;font-weight:700;letter-spacing:.14em;color:${C.muted};margin-bottom:14px}
.step-t{font-size:16px;font-weight:600;color:${C.text};margin-bottom:8px;letter-spacing:-.01em}
.step-d{font-size:13px;color:${C.sub};line-height:1.7;font-weight:300}

/* FEATURES */
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.feat{padding:24px 20px;background:${C.bg2};border:1px solid ${C.border};border-radius:10px;transition:border-color .2s,box-shadow .2s}
.feat:hover{border-color:${C.plum};box-shadow:0 4px 16px rgba(61,43,74,.08)}
.feat-icon{color:${C.plum};margin-bottom:12px;opacity:.75}
.feat-name{font-size:14px;font-weight:600;color:${C.text};margin-bottom:5px;letter-spacing:-.01em}
.feat-desc{font-size:12px;color:${C.sub};line-height:1.65;font-weight:300}
.feats-cta{display:flex;justify-content:center;margin-top:36px}

/* FEAT grid → 4 cols on wide */
@media(min-width:900px){.feats{grid-template-columns:repeat(4,1fr)}}

/* QUOTE */
.quote-sec{padding:72px 80px;text-align:center;border-top:1px solid ${C.border};border-bottom:1px solid ${C.border};max-width:1100px;margin:0 auto}
.quote-txt{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,3vw,36px);font-weight:500;font-style:italic;line-height:1.4;color:${C.text};max-width:640px;margin:0 auto}
.quote-attr{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${C.muted};margin-top:18px}

/* EL EXPERTO */
.expert{background:${C.bg2};border-top:1px solid ${C.border};border-bottom:1px solid ${C.border};padding:80px 80px}
.expert-inner{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:340px 1fr;gap:56px;align-items:start}
.expert-photo{display:flex;flex-direction:column;gap:20px;position:sticky;top:100px}
.expert-photo-frame{width:100%;aspect-ratio:3/4;border-radius:16px;overflow:hidden;background:linear-gradient(150deg,${C.plumSoft},${C.terraSoft});border:1px solid ${C.border};box-shadow:0 12px 44px rgba(61,43,74,.08)}
.expert-img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.expert-follow{display:flex;align-items:center;gap:14px}
.expert-follow-label{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${C.muted}}
.expert-follow-icons{display:flex;gap:8px}
.expert-social{width:30px;height:30px;border-radius:50%;border:1px solid ${C.borderMd};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:${C.sub};text-transform:uppercase;cursor:pointer;transition:all .15s}
.expert-social:hover{background:${C.plum};color:#fff;border-color:${C.plum}}
.expert-body{padding-top:6px}
.expert-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,3.4vw,44px);font-weight:500;line-height:1.12;letter-spacing:-.005em;color:${C.text};margin:6px 0 20px}
.expert-title em{font-style:italic;color:${C.plum}}
.expert-lead{font-size:17px;font-weight:400;color:${C.text};line-height:1.6;margin-bottom:20px}
.expert-p{font-size:14px;font-weight:300;color:${C.sub};line-height:1.8;margin-bottom:16px}
.expert-mission{margin-top:28px;padding:22px 24px;background:${C.bg};border-radius:12px;border-left:3px solid ${C.plum}}
.expert-mission-label{font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${C.plum};margin-bottom:8px}
.expert-mission-txt{font-size:15px;font-weight:400;color:${C.text};line-height:1.65}
.expert-mission-txt em{font-style:italic;color:${C.plum};font-weight:500}

/* TESTIMONIOS */
.testi{padding:80px 80px;max-width:1180px;margin:0 auto}
.testi-grid{columns:3;column-gap:20px;margin-top:8px}
.testi-card{background:${C.bg2};border:1px solid ${C.border};border-radius:16px;padding:26px 24px;position:relative;transition:transform .2s,box-shadow .2s;break-inside:avoid;margin-bottom:20px;display:inline-block;width:100%}
.testi-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.07)}
.testi-mark{font-family:'Cormorant Garamond',serif;font-size:56px;line-height:.6;color:${C.plum};opacity:.26;height:26px}
.testi-txt{font-family:'Cormorant Garamond',serif;font-size:19px;font-style:italic;font-weight:500;line-height:1.42;color:${C.text};margin:6px 0 18px}
.testi-attr{display:flex;flex-direction:column;gap:2px;border-top:1px solid ${C.border};padding-top:14px}
.testi-name{font-size:13px;font-weight:600;color:${C.text};letter-spacing:.02em}
.testi-role{font-size:11px;font-weight:400;color:${C.muted};letter-spacing:.04em}

/* FOOTER */
.footer{padding:36px 80px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:${C.muted};border-top:1px solid ${C.border};max-width:1100px;margin:0 auto}
.footer-links{display:flex;gap:20px}
.footer-lnk{font-size:12px;color:${C.muted};border:none;background:none;cursor:pointer;font-weight:400;transition:color .15s}
.footer-lnk:hover{color:${C.plum}}


/* FORM */
.form-wrap{min-height:100vh;background:${C.bg};display:grid;grid-template-columns:1fr 1fr;position:relative}
.form-back{position:absolute;top:24px;left:24px;z-index:5;display:flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:${C.muted};border:none;background:none;cursor:pointer;padding:6px 10px;border-radius:6px;transition:background .15s}
.form-back:hover{background:${C.bg3};color:${C.plum}}
.form-left{background:${C.bg2};border-right:1px solid ${C.border};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 48px;gap:32px}
.form-right{padding:100px 64px 60px;overflow-y:auto}
.form-title{font-size:28px;font-weight:700;letter-spacing:-.02em;margin-bottom:8px;color:${C.text}}
.form-sub{font-size:14px;color:${C.muted};margin-bottom:40px;line-height:1.6;font-weight:300}
.field{margin-bottom:22px}
.field-label{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${C.muted};display:block;margin-bottom:7px}
.field-input{width:100%;font-size:14px;font-family:'Inter',sans-serif;font-weight:400;background:${C.bg2};border:1px solid ${C.border};border-radius:8px;padding:11px 14px;color:${C.text};outline:none;transition:border-color .2s}
.field-input:focus{border-color:${C.plum}}
.field-input:disabled{opacity:.4}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.chk-row{display:flex;align-items:center;gap:8px;margin-top:8px}
.chk-row input{accent-color:${C.plum};width:14px;height:14px;cursor:pointer}
.chk-row label{font-size:12px;color:${C.muted};cursor:pointer;font-weight:300}
.btn-submit{width:100%;padding:14px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:${C.plum};color:#fff;border:none;border-radius:6px;cursor:pointer;margin-top:8px}
.btn-submit:hover{opacity:.88}

/* LOADING */
.loading{min-height:100vh;background:${C.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px}
.spinner{width:36px;height:36px;border-radius:50%;border:1.5px solid ${C.border};border-top-color:${C.plum};animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.load-txt{font-size:13px;color:${C.muted};font-style:italic;font-weight:300}

/* DASHBOARD */
.dash-header{position:sticky;top:0;z-index:50;background:rgba(240,238,235,.95);backdrop-filter:blur(12px);border-bottom:1px solid ${C.border};padding:13px 24px;display:flex;align-items:center;justify-content:space-between}
.dash-back{font-size:12px;font-weight:500;color:${C.muted};cursor:pointer;display:flex;align-items:center;gap:6px;border:none;background:none}
.dash-back:hover{color:${C.text}}
.dash-name{font-size:15px;font-weight:700;text-align:center;color:${C.text};letter-spacing:-.01em}
.dash-meta{font-size:11px;color:${C.muted};text-align:center;margin-top:1px;font-weight:300}
.btn-save{font-size:11px;font-weight:700;padding:7px 16px;border:1px solid ${C.border};background:transparent;border-radius:4px;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;color:${C.muted};transition:all .15s;min-width:92px}
.btn-save:hover{border-color:${C.plum};color:${C.plum}}
.btn-save.saved{background:${C.sage};border-color:${C.sage};color:#fff}

.dash-body{display:grid;grid-template-columns:390px 1fr;height:calc(100vh - 55px)}
.dash-left{border-right:1px solid ${C.border};padding:20px;overflow-y:auto;background:${C.bg2}}
.dash-right{overflow-y:auto;display:flex;flex-direction:column;background:${C.bg}}

.panel-label{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:${C.muted};margin:16px 0 10px}
.ptable{width:100%;border-collapse:collapse}
.ptable th{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};text-align:left;padding:0 7px 8px;border-bottom:1px solid ${C.border}}
.ptable td{font-size:12px;padding:6px 7px;border-bottom:1px solid rgba(0,0,0,.04);color:${C.sub};vertical-align:middle}
.ptable tr:last-child td{border-bottom:none}

.tabs-bar{display:flex;overflow-x:auto;padding:0 20px;border-bottom:1px solid ${C.border};scrollbar-width:none;flex-shrink:0;background:${C.bg2}}
.tabs-bar::-webkit-scrollbar{display:none}
.tab-btn{font-size:11px;font-weight:600;padding:13px 13px;cursor:pointer;white-space:nowrap;color:${C.muted};border:none;background:none;border-bottom:2px solid transparent;letter-spacing:.07em;text-transform:uppercase;display:flex;align-items:center;gap:5px}
.tab-btn:hover{color:${C.sub}}
.tab-btn.on{color:${C.plum};border-bottom-color:${C.plum}}

@media(max-width:1000px){
  .testi-grid{columns:2}
  .hero{grid-template-columns:1fr;padding:100px 32px 60px;text-align:center}
  .hero-visual{display:none}
  .dash-body{grid-template-columns:1fr}
  .dash-left{border-right:none;border-bottom:1px solid ${C.border}}
  .form-wrap{grid-template-columns:1fr}
  .form-left{display:none}
  .steps,.feats{grid-template-columns:1fr}
  .nav{padding:16px 24px}
  .nav-links{display:none}
  .section,.footer{padding:60px 24px}
  .divider-line{margin:0 24px}
  .quote-sec{padding:60px 24px}
  .expert{padding:60px 24px}
  .expert-inner{grid-template-columns:1fr;gap:32px}
  .expert-photo{position:static;max-width:280px}
  .testi{padding:60px 24px}
  .testi-grid{columns:1}
}
`;

// ── PAGES ─────────────────────────────────────────────────────────────────────
const ENZO_PHOTO = "data:image/jpeg;base64,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";

function Landing({go,demo,scrollTo}){
  const feats=[
    {i:"chart",n:"Memoria sistémica",d:"Elemento dominante, ausencias y patrones proyectivos del linaje."},
    {i:"eye",n:"Signo oculto",d:"El patrón invisible que opera por debajo de la conciencia familiar."},
    {i:"layers",n:"Ascendente sistémico",d:"Casas derivadas y el lugar que el sistema asignó al consultante."},
    {i:"link",n:"Aspectos sistémicos",d:"Cada lazo planetario leído como conflicto o recurso heredado."},
    {i:"ring",n:"Mandatos de Saturno",d:"Compromisos transgeneracionales que pesan hasta cuatro generaciones."},
    {i:"heart",n:"Órdenes del amor",d:"Pertenencia, jerarquía y equilibrio en el sistema familiar."},
    {i:"body",n:"Astrosomática",d:"El mapa del cuerpo y las memorias que se expresan como síntoma."},
    {i:"circle",n:"Esferas Internas",d:"Protocolo de movimiento del alma. Las 12 esferas de De Paola."},
  ];
  return(
    <div>
      <nav className="nav">
        <div><div className="logo">Astrogenealogía</div><span className="logo-sub">Método Enzo De Paola</span></div>
        <div className="nav-links">
          <button className="nav-lnk" onClick={()=>scrollTo("como-funciona")}>El método</button>
          <button className="nav-lnk" onClick={()=>scrollTo("que-incluye")}>Qué incluye</button>
          <button className="nav-lnk" onClick={()=>scrollTo("experto")}>Sobre Enzo</button>
          <button className="nav-lnk" onClick={demo}>Ver demo</button>
        </div>
        <button className="nav-cta" onClick={go}>Comenzar</button>
      </nav>

      <div style={{maxWidth:1180,margin:'0 auto'}}>
        <div className="hero">
          <div>
            <div className="hero-eyebrow">Formación Internacional de Astrogenealogía</div>
            <h1 className="hero-title">Tu linaje habla.<br/><em>Tu carta lo revela.</em></h1>
            <p className="hero-sub">Astrogenealogía clínica según el método de Enzo De Paola. La carta calcula sola el signo oculto, el punto medio Lilith-Quirón, las casas derivadas y las memorias del linaje — con interpretación lista para la sesión.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={go}>Comenzar mi lectura</button>
              <button className="btn-outline" onClick={demo}>Ver demostración →</button>
            </div>
            <div className="hero-note">Explora una carta completa de ejemplo, sin registro.</div>
          </div>
          <div className="hero-visual">
            <div className="hero-wheel-wrap" onClick={demo} style={{cursor:'pointer'}} title="Ver la carta completa">
              <NatalWheel size={320}/>
              <div className="hero-wheel-hint">Explorar esta carta →</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider-line"/>

      <div className="section" id="como-funciona">
        <div className="sec-eyebrow">Cómo funciona</div>
        <h2 className="sec-title">Tres pasos hacia tu <em>mapa sistémico</em></h2>
        <div className="steps">
          {[{n:"01",t:"Introduce tus datos",d:"Fecha, hora y lugar de nacimiento."},
            {n:"02",t:"Generamos tu carta",d:"Posiciones, memorias y aspectos al instante."},
            {n:"03",t:"Accede a tu mapa",d:"Contenido clínico listo para sesión."}].map(s=>(
            <div className="step" key={s.n}>
              <div className="step-n">{s.n}</div>
              <div className="step-t">{s.t}</div>
              <div className="step-d">{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider-line"/>

      <div className="section" id="que-incluye" style={{paddingTop:60}}>
        <div className="sec-eyebrow">Qué incluye</div>
        <h2 className="sec-title">Todo lo que necesitas <em>en sesión</em></h2>
        <div className="feats">
          {feats.map(f=>(
            <div className="feat" key={f.n} onClick={demo} style={{cursor:'pointer'}}>
              <div className="feat-icon"><Ico n={f.i} s={18} c={C.plum}/></div>
              <div className="feat-name">{f.n}</div>
              <div className="feat-desc">{f.d}</div>
            </div>
          ))}
        </div>
        <div className="feats-cta">
          <button className="btn-primary" onClick={demo}>Ver una carta de ejemplo completa →</button>
        </div>
      </div>

      <div className="quote-sec">
        <p className="quote-txt">"La astrogenealogía no predice el futuro. Revela el pasado que aún vive en ti."</p>
        <p className="quote-attr">Enzo De Paola · Formación Internacional de Astrogenealogía</p>
      </div>

      {/* ── EL EXPERTO ── */}
      <div className="expert" id="experto">
        <div className="expert-inner">
          <div className="expert-photo">
            <div className="expert-photo-frame">
              <img src={ENZO_PHOTO} alt="Enzo De Paola" className="expert-img"/>
            </div>
            <div className="expert-follow">
              <span className="expert-follow-label">Sígueme</span>
              <div className="expert-follow-icons">
                {["in","ig","yt"].map(s=>(
                  <span key={s} className="expert-social">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="expert-body">
            <div className="sec-eyebrow">Hola, soy Enzo</div>
            <h2 className="expert-title">Pionero en Astrogenealogía y creador de un <em>enfoque terapéutico integrador</em></h2>
            <p className="expert-lead">Más de 35 años uniendo psicología, astrología y genealogía para transformar vidas desde la raíz.</p>
            <p className="expert-p">Psicólogo clínico, astrólogo profesional y constelador familiar. Llevo más de tres décadas acompañando procesos terapéuticos profundos, ayudando a personas a transformar aquello que pesa, pero no siempre se ve.</p>
            <p className="expert-p">Desde muy joven entendí que el alma guarda una memoria más allá de lo que podemos explicar. Y que para sanar no basta con entender: hace falta honrar lo que fuimos y liberar lo que ya no necesitamos cargar.</p>
            <div className="expert-mission">
              <div className="expert-mission-label">Mi misión</div>
              <p className="expert-mission-txt">Acompañar a personas conscientes a transformar cargas invisibles en claridad interior, a través de la Astrogenealogía y del método vivencial <em>Movimiento de las Esferas Internas</em>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIOS ── */}
      <div className="testi" id="testimonios">
        <div className="sec-eyebrow" style={{textAlign:'center'}}>Testimonios</div>
        <h2 className="sec-title" style={{textAlign:'center'}}>Lo que dicen quienes <em>lo han vivido</em></h2>
        <div className="testi-grid">
          {[
            {t:"Un trabajo sanador y profundo. Si estás dudando en tomar la sesión, solo hazlo. Vale cada segundo.",n:"Sebastián Reyes"},
            {t:"Más que una sesión, es una inversión en tu bienestar. Me voy con el corazón más tranquilo y la mente clara.",n:"Camila Ortiz"},
            {t:"Ver cómo todo encaja en tu mapa personal es asombroso. Una herramienta de autoconocimiento brutal.",n:"Mateo Silva"},
            {t:"Encontré un entendimiento que no había logrado en años de terapia. Mil gracias por tanta luz.",n:"Isabella Gutiérrez"},
            {t:"Es un viaje de reconexión profunda contigo mismo y con tus raíces. Lo recomiendo al 100%.",n:"Diego Torres"},
            {t:"Por fin comprendo por qué me sentía atascada. Esta terapia me dio las respuestas y el impulso para avanzar.",n:"Lucía Fernández"},
            {t:"La calidez y sabiduría de Enzo para guiarte en el proceso es inigualable. Te sientes sostenido en todo momento.",n:"Martín Cabrera"},
            {t:"Sentí que me quitaba un peso de encima que no era mío. Salí de la sesión sintiéndome mucho más ligera.",n:"Valentina Rojas"},
            {t:"Ponerle luz a la historia de mis ancestros me dio la paz que necesitaba para sanar. Un trabajo invaluable.",n:"Javier Mendoza"},
            {t:"La Astrogenealogía me ayudó a entender lo que arrastraba sin saberlo.",n:"Catalina Montoya"},
            {t:"No es solo una sesión. Es una llave hacia tu alma.",n:"Carolina Aguilar"},
            {t:"Enzo me dio estructura, claridad y compasión. Lo recomiendo sin dudar.",n:"Marcela Baeza"},
            {t:"Llegué con muchas dudas y salí con una claridad reveladora. Entendí patrones que repetía sin darme cuenta.",n:"Sofía Vargas"},
          ].map((q,i)=>(
            <div className="testi-card" key={i}>
              <div className="testi-mark">"</div>
              <p className="testi-txt">{q.t}</p>
              <div className="testi-attr">
                <span className="testi-name">{q.n}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div>
          <div style={{fontWeight:700,fontSize:14,color:C.text,letterSpacing:'.06em'}}>Astrogenealogía Clínica</div>
          <div style={{fontSize:11,color:C.muted,marginTop:2}}>Método Enzo De Paola</div>
        </div>
        <div className="footer-links">
          <button className="footer-lnk" onClick={()=>scrollTo("experto")}>Sobre Enzo</button>
          <button className="footer-lnk" onClick={demo}>Ver demo</button>
          <button className="footer-lnk" onClick={go}>Comenzar</button>
        </div>
      </footer>
    </div>
  );
}

function Form({go,back}){
  const[f,setF]=useState({nombre:"Debora Moratalla Martín",fecha:"1986-10-25",hora:"03:00",lugar:"Madrid, España",email:"",pro:false,noHora:false});
  const h=(k,v)=>setF(p=>({...p,[k]:v}));
  return(
    <div className="form-wrap">
      <button className="form-back" onClick={back}><Ico n="back" s={13} c={C.muted}/> Volver</button>
      <div className="form-left">
        <div style={{background:C.bg,borderRadius:16,border:`1px solid ${C.border}`,padding:20}}>
          <NatalWheel size={260}/>
        </div>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:C.plum,marginBottom:8}}>Astrogenealogía</div>
          <div style={{fontSize:18,fontWeight:700,color:C.text,letterSpacing:'-.02em',lineHeight:1.3}}>Tu mapa sistémico<br/>en minutos</div>
          <div style={{fontSize:12,color:C.muted,marginTop:8,lineHeight:1.6,fontWeight:300}}>Método Enzo De Paola</div>
        </div>
      </div>
      <div className="form-right">
        <h1 className="form-title">Carta natal clínica</h1>
        <p className="form-sub">Introduce los datos del consultante para generar su mapa sistémico completo, según el método de Enzo De Paola.</p>
        <div className="field"><label className="field-label">Nombre completo</label><input className="field-input" value={f.nombre} onChange={e=>h('nombre',e.target.value)} placeholder="Nombre y apellidos"/></div>
        <div className="field-row">
          <div className="field"><label className="field-label">Fecha de nacimiento</label><input className="field-input" type="date" value={f.fecha} onChange={e=>h('fecha',e.target.value)}/></div>
          <div className="field"><label className="field-label">Hora de nacimiento</label><input className="field-input" type="time" value={f.hora} disabled={f.noHora} onChange={e=>h('hora',e.target.value)}/><div className="chk-row"><input type="checkbox" id="nH" checked={f.noHora} onChange={e=>h('noHora',e.target.checked)}/><label htmlFor="nH">No sé la hora exacta</label></div></div>
        </div>
        <div className="field"><label className="field-label">Lugar de nacimiento</label><input className="field-input" value={f.lugar} onChange={e=>h('lugar',e.target.value)} placeholder="Ciudad, País"/></div>
        <div className="field"><label className="field-label">Email (opcional)</label><input className="field-input" type="email" value={f.email} onChange={e=>h('email',e.target.value)} placeholder="Para recibir tu carta"/></div>
        <div className="chk-row" style={{marginBottom:20}}><input type="checkbox" id="pro" checked={f.pro} onChange={e=>h('pro',e.target.checked)}/><label htmlFor="pro">Soy profesional / terapeuta</label></div>
        <button className="btn-submit" onClick={go}>Generar mi carta natal →</button>
      </div>
    </div>
  );
}

function Loading(){
  return(
    <div className="loading">
      <div style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:4}}>
        <NatalWheel size={200}/>
      </div>
      <div className="spinner"/>
      <p className="load-txt">Calculando tu mapa sistémico...</p>
    </div>
  );
}

function Dashboard({back}){
  const[tab,setTab]=useState(0);
  const[saved,setSaved]=useState(false);
  const doSave=()=>{setSaved(true);setTimeout(()=>setSaved(false),1800);};
  const tabs=[
    {l:"Carta",i:"chart"},{l:"Memoria",i:"chart"},{l:"Signo Oculto",i:"eye"},
    {l:"Asc. Sistémico",i:"layers"},{l:"Órdenes",i:"heart"},{l:"Aspectos",i:"link"},{l:"Asteroides",i:"orbit"},{l:"Saturno",i:"ring"},
    {l:"Punto Medio",i:"target"},{l:"Somática",i:"body"},{l:"Síntesis",i:"star"},{l:"Notas",i:"file"},{l:"Esferas",i:"circle"},
  ];
  const panels=[PCarta,PMemoria,PSignoOculto,PAscendente,POrdenes,PAspectos,PAsteroides,PSaturno,PPuntoMedio,PSomatica,PSintesis,PNotas,PEsferas];
  const Panel=panels[tab];
  return(
    <div style={{minHeight:'100vh',background:C.bg}}>
      <div className="dash-header">
        <button className="dash-back" onClick={back}><Ico n="back" s={13} c={C.muted}/>Nueva consulta</button>
        <div><div className="dash-name">{DEMO.nombre}</div><div className="dash-meta">{DEMO.fecha} · {DEMO.hora} · {DEMO.lugar}</div></div>
        <button className={`btn-save${saved?" saved":""}`} onClick={doSave}>{saved?"✓ Guardado":"Guardar"}</button>
      </div>
      <div className="dash-body">
        <div className="dash-left">
          <NatalWheel size={350}/>
          <div style={{display:'flex',gap:14,justifyContent:'center',margin:'8px 0 4px',flexWrap:'wrap'}}>
            {[[C.blue,"5,3","Trígono"],[C.terra,"3,3","Cuadratura"],[C.muted,"","Conjunción"]].map(([c,d,l])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:5,fontSize:10,color:C.muted,fontWeight:500}}>
                <svg width="14" height="5"><line x1="0" y1="2.5" x2="14" y2="2.5" stroke={c} strokeWidth="1.2" strokeDasharray={d}/></svg>{l}
              </div>
            ))}
          </div>
          <div className="panel-label">Posiciones</div>
          <table className="ptable">
            <thead><tr><th>Planeta</th><th>Signo</th><th>Casa</th><th>℞</th></tr></thead>
            <tbody>
              {DEMO.planetas.map((p,i)=>(
                <tr key={i}>
                  <td><span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:elC[p.el],marginRight:6,verticalAlign:'middle'}}/><span style={{fontFamily:'serif',marginRight:3,fontSize:13,color:elC[p.el]}}>{p.g}</span><span style={{fontSize:11,color:C.muted}}>{p.p}</span></td>
                  <td style={{fontSize:11}}>{p.s}</td>
                  <td style={{fontSize:11,fontWeight:600,color:C.plum}}>{p.c}</td>
                  <td style={{fontSize:10,color:C.muted}}>{p.r?'℞':''}</td>
                </tr>
              ))}
              <tr><td style={{fontWeight:600,fontSize:11,color:C.plum}}>AC</td><td colSpan={3} style={{fontSize:11,color:C.muted}}>Virgo 9°45'</td></tr>
              <tr><td style={{fontWeight:600,fontSize:11,color:C.plum}}>MC</td><td colSpan={3} style={{fontSize:11,color:C.muted}}>Géminis 6°22'</td></tr>
            </tbody>
          </table>
        </div>
        <div className="dash-right">
          <div className="tabs-bar">
            {tabs.map((t,i)=>(
              <button key={i} className={`tab-btn${tab===i?" on":""}`} onClick={()=>setTab(i)}>
                <Ico n={t.i} s={12} c={tab===i?C.plum:C.muted}/>{t.l}
              </button>
            ))}
          </div>
          <Panel/>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[page,setPage]=useState("landing");
  const go=()=>setPage("form");
  const demo=()=>setPage("dash");                 // salta directo a la carta de Debora
  const submit=()=>{setPage("loading");setTimeout(()=>setPage("dash"),2200)};
  const scrollTo=(id)=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth"});};
  return(
    <>
      <style>{css}</style>
      {page==="landing"&&<Landing go={go} demo={demo} scrollTo={scrollTo}/>}
      {page==="form"&&<Form go={submit} back={()=>setPage("landing")}/>}
      {page==="loading"&&<Loading/>}
      {page==="dash"&&<Dashboard back={()=>setPage("landing")}/>}
      <Analytics />
    </>
  );
}