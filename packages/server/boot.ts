import { ClientBuilder } from './builders/ClientBuilder'
import { AdminBuilder } from './builders/AdminBuilder'
import { ProductBuilder } from './builders/ProductBuilder'
import { insertAdmin } from './dbModules/AdminModule';
import { insertRole } from './dbModules/RoleModule'
import { insertClient } from './dbModules/ClientModule'
import { insertProduct } from './dbModules/ProductModule'
import { Role } from './entities/Role';
import { Pool } from 'pg';
import { ProductImage } from './entities/ProductImage';
import {Product}  from './entities/Product'
import {User}  from './entities/User'
import {Client}  from './entities/Client'
import {Admin}  from './entities/Admin'
import {Cart}  from './entities/Cart'
import {Answer}  from './entities/Answer'
import {Question}  from './entities/Question'
import {Review}  from './entities/Review'
import {insertQustionAnswer}  from './dbModules/QuestionAnswerModule'

const client = new ClientBuilder()
                    .withFirstName("Martin")
                    .withLastName("Peroni")
                    .withBirthDate(new Date(1994,6,6))
                    .withDni("38955384")
                    .withDirection("Las Magnolias 2011")
                    .withPassword("peroni1994")
                    .withSellerCalification("0")
                    .withEmail("mperoni@gmail.com")
                    .build()

const seller = new ClientBuilder()
                    .withFirstName("Federico")
                    .withLastName("Pilares")
                    .withBirthDate(new Date(1996,2,7))
                    .withDni("40876988")
                    .withDirection("Fonares 4513")
                    .withPassword("pilares1996")
                    .withSellerCalification("5")
                    .withEmail("fpilares@gmail.com")
                    

const roles = [
    new Role("", "1", 1),
    new Role("", "2", 2),
    new Role("", "3", 3),
    new Role("", "4", 4),
    new Role("", "5", 5),
]

const admin = new AdminBuilder()
                    .withFirstName("Jose")
                    .withLastName("Sanchez")
                    .withBirthDate(new Date(1988,4,22))
                    .withDni("35384576")
                    .withDirection("Araucarias 1334")
                    .withPassword("sanchez1988")
                    .withEmail("jsanchez@gmail.com")
                    .build()

                    
const products = [
    new ProductBuilder()
    .withName("Licuadora Oster Brly07-z00-354")
    .withDescription("<p>ESPECIFICACIONES TECNICAS<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>GENERALES<br>- Potencia: 600 W<br>- Material del Vaso: Vidrio <br>- Capacidad del Vaso: 1.5 Lts<br>- Cuchilla de Acero Inoxidable: Si<br>- Pica Hielo: Si<br>- Velocidades: 3 <br>- Pulsador: Si<br>GARANTÍA<br>- Duración: 12 meses<br>- Origen: Argentina <br>- Cobertura: Oficial <br>-------------------------------------------------------------------<br>ENVÍO/ENTREGA DE PRODUCTOS<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>Al momento de elegir la forma de entrega podrás optar por envío a domicilio (puede tener costo) o seleccionar la opción GRATUITA de retiro en cualquiera de nuestras sucursales.<br>-------------------------------------------------------------------<br>El cumplimiento de la fecha de entrega, puede verse afectado por cuestiones coyunturales de fuerza mayor que exceden a la compañía<br>-------------------------------------------------------------------<br>POLÍTICAS DE CAMBIO Y DEVOLUCIÓN<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>Garbarino te brinda 10 días de corrido para que puedas cambiar o devolver el producto. Para ello, podes acercarte con tu producto a cualquiera de nuestras sucursales.<br>Los cambios se encuentran sujetos a disponibilidad de stock.<br>-------------------------------------------------------------------<br>HORARIO DE ATENCIÓN<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>Lunes a domingos de 8 a 22 hs. y feriados de 9 a 18 hs.<br>-------------------------------------------------------------------<br>PREGUNTAS FRECUENTES<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>STOCK<br>¯¯¯¯¯¯¯¯¯<br>¿Tienen stock?<br>Si, tenemos stock de todos los productos publicados.<br>-------------------------------------------------------------------<br>ENVÍOS<br>¯¯¯¯¯¯¯¯¯¯<br>¿Cuándo me entregan el producto?<br>Los tiempos de entrega varían según la zona y disponibilidad del producto. Una vez realizada la compra te enviaremos un email con la fecha de entrega.<br>En caso de retiro en sucursal, si tenemos stock en la sucursal seleccionada podrás retirar el producto en el día, una vez recibida la factura de compra.<br>-------------------------------------------------------------------<br>¿Cuál es el precio de los envíos?<br>Los precios de envío varían según la zona. Antes de finalizar la compra podrás consultar el precio.<br>-------------------------------------------------------------------<br>¿El envío lo pago junto con el producto?<br>Si, pagas todo junto (producto + envío).<br>-------------------------------------------------------------------<br>¿Hacen envíos a todo el país?<br>Si, excepto Tierra del Fuego.<br>-------------------------------------------------------------------<br>¿Me podrán hacer la entrega en mi trabajo o en otro lado?<br>Si, podes recibirlo en el domicilio que quieras.<br>-------------------------------------------------------------------<br>¿El producto lo puede recibir cualquier persona?<br>Si, en el proceso de compra, vas a poder definir quién va a recibir el pedido.<br>-------------------------------------------------------------------<br>CAMBIOS<br>¯¯¯¯¯¯¯¯¯¯¯¯<br>¿Cuánto tiempo tengo para cambiar o devolver un producto?<br>Tenes 10 días de corrido, a partir del momento en que recibís el producto.<br>-------------------------------------------------------------------<br>¿Tiene algún costo?<br>Los cambios y/o devoluciones no tienen costo. En el caso de un cambio por un producto de mayor valor, se cobrará la diferencia.<br>-------------------------------------------------------------------<br>¿Cómo gestiono un cambio o devolución?<br>Podes gestionar tu cambio o devolución de producto contactándote con nosotros a través del teléfono o mail detallado en el comprobante de tu compra.<br>-------------------------------------------------------------------<br>¿Cuánto tiempo tarda en acreditarse una devolución?<br>Una vez que el producto esté nuevamente en Garbarino, en un plazo de 72 hs hábiles aproximadamente, se realizará la devolución correspondiente a la tarjeta de crédito con la que pagaste.<br>-------------------------------------------------------------------<br>¿Puedo cambiar un producto pasados los 10 días de haberlo recibido?<br>Una vez transcurridos los días de haber recibido tu pedido, debes contactarte con la garantía del mismo para efectuar la reparación o cambio del producto.<br>-------------------------------------------------------------------<br>¿Todos los productos tienen devolución?<br>No, debido a la naturaleza de algunos artículos, no aceptamos devoluciones en todos los productos. Como los considerados frágiles, (artículos de vidrio, espejos y vajillas), por lo que tenes que chequear su estado al momento de recibirlo ya que una vez firmado el remito en conformidad se acepta la entrega en buen estado. Esto también aplica para el caso de productos de perfumería y uso personal. En caso de ser una licencia o producto virtual no se aceptarán devoluciones.<br>-------------------------------------------------------------------<br>GARANTÍA<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>¿Tiene garantía de fábrica?<br>Si, todos nuestros productos tienen Garantía de fábrica. En el detalle de cada uno podrás ver cuál es el plazo de la garantía.<br>-------------------------------------------------------------------<br>¿Puedo extender la protección de mi producto?<br>Si, algunos productos tienen la posibilidad de extender su protección. Una vez realizada la compra obtendrás nuestro teléfono para poder contratarla.<br>-------------------------------------------------------------------<br>INSTALACIÓN<br>¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯<br>¿Ustedes realizan la instalación?<br>Una vez realizada la compra podes acercarte a cualquiera de nuestras sucursales para verificar si el servicio de instalación se encuentra disponible en tu zona.<br>-------------------------------------------------------------------<br>PAGOS<br>¯¯¯¯¯¯¯¯¯¯<br>¿Qué tarjetas aceptan?<br>Aceptamos todas las tarjetas de crédito aceptadas por Mercado Pago. Podes consultar todas las promociones ingresando a Mercado Pago.<br>-------------------------------------------------------------------<br>¿Puedo abonar con 2 Tarjetas?<br>Si, al momento de pagar podrás seleccionar hasta 2 tarjetas y elegir el monto que querés pagar con cada una.<br>-------------------------------------------------------------------<br>¿Realizan factura A?<br>Por disposición de mercado libre únicamente aceptamos Factura B.<br>-------------------------------------------------------------------<br>¿Aceptan mercado envíos?<br>No, el envío de los productos se realiza únicamente mediante logística propia.</p>")
    .withValue(2.599)
    .withImage(new ProductImage("", "https://http2.mlstatic.com/licuadora-oster-brly07-z00-354-15-lts-3-velocidades-600-w-D_NQ_NP_791678-MLA31116034201_062019-O.webp", ""))
    .build()
    ,
    new ProductBuilder()
    .withName("Tv Led 32 Philips Hd Mod. 32phg5101/77")
    .withDescription("<p>PHILIPS TELEVISION - TIENDA OFICIAL<br><br>Televisor LED delgado<br><br>Con Digital Crystal Clear<br><br>* 80 cm (32)<br>* Televisor LED<br>* DTVi<br><br>* El marco ultraestrecho ofrece más imágenes que te encantarán Los televisores tradicionales tienen un marco que va alrededor del televisor como un marco para fotos. Nuestro marco ultraestrecho es moderno y delgado, así podés disfrutar mucho más la imagen. <br><br>* Televisor LED para imágenes con un contraste increíble Gracias a la retroiluminación LED, podés disfrutar de un bajo consumo de energía, un alto grado de brillo, un contraste increíble y colores vibrantes. <br><br>* USB para reproducción multimedia Compartí la diversión. Conectá tu Memory Stick USB, cámara digital, reproductor de MP3 u otro dispositivo multimedia al puerto USB del televisor para disfrutar de fotos, videos y música mediante el explorador de contenidos en pantalla fácil de usar. <br><br>* Diseñado con un aspecto contemporáneo que combina con tu decoración, ya que el televisor debe lucir fantástico tanto apagado como encendido.<br><br>* Dos entradas HDMI e EasyLink para una conectividad integrada Evitá los líos de cables gracias a un solo cable HDMI que transporta las señales de video y audio desde los dispositivos al televisor. HDMI utiliza señales sin comprimir, lo que garantiza la máxima calidad desde la fuente a la pantalla. Si a eso añadimos EasyLink de Philips, solo necesitarás un control remoto para realizar la mayoría de operaciones en tu televisor, DVD, reproductor de Blu-ray, sintonizador o sistema Home Theatre.<br><br>* El diseño de base abierta crea un efecto de luz flotante Un televisor con líneas modernas y refinadas merece una base que lo ubique por sobre el resto. Es por eso que los diseñadores de los televisores Philips crearon esta base abierta única, con el fin de que se adapte perfectamente a tu decoración.<br><br>* Índice de rendimiento de imágenes 240. El índice de rendimiento de imágenes 240 combina la tecnología de visualización de Philips con los motores de procesamiento de imágenes avanzados para mejorar los elementos de percepción: nitidez, contraste y color. Sin importar la fuente, siempre disfrutarás de imágenes nítidas con increíbles detalles y profundidad, y los colores más brillantes e intensos, así como tonos de piel naturales y realistas.<br><br>* Digital Crystal Clear: precisión que querrás compartir. Philips ha creado Digital Crystal Clear para que puedas disfrutar de unas imágenes que parecen naturales desde cualquier fuente. Tanto si estás viendo tu serie favorita o película, como si se trata de las noticias o vas a ver algo con los amigos, podrás disfrutar de contenido multimedia en un contraste, color y nitidez óptimos.<br><br>* IMAGEN / PANTALLA<br><br>Pantalla: TV LED HD<br>Tamaño de pantalla en diagonal (métrico): 80 cm<br>Tamaño diagonal de pantalla (pulgadas): 32 pulgadas<br>Resolución de panel: 1366 x 768 p<br>Relación de aspecto: 4:3 / 16:9<br>Brillo: 280 cd/m²<br>Optimización de la imagen<br>Digital Crystal Clear<br>Índice de rendimiento de imágenes 240 <br><br>* CONECTIVIDAD<br><br>Cantidad de conexiones HDMI: 2<br>Cantidad de puertos USB:1<br><br>* RESOLUCION DE PANTALLA COMPATIBLE<br><br>Entradas de la computadora: hasta 1920 x 1080 a 60 Hz<br>Entradas de video: 24, 25, 30, 50, 60 Hz<br>    hasta 1920 x 1080p<br><br>* DIMENSIONES<br><br>Profundidad del equipo: 77 mm<br>Altura del equipo: 430 mm<br>Ancho del equipo: 733 mm<br>Profundidad del producto (con soporte): 189 mm<br>Altura del producto (con soporte): 484 mm<br>Ancho del producto (con soporte): 733 mm<br>Peso del producto: 4,6 kg<br>Peso del producto (+ soporte): 4,8 kg<br>Compatible con el soporte de pared VESA: 100 x 100 mm<br>----------------------------------------------------------------------------------<br>¿DONDE ESTAMOS? <br>ZONA: Alto Palermo Shopping, próximos al Bvd Charcas y Bulnes. <br>SUBTE: Linea D, estación Bulnes <br>COLECTIVOS: 12 - 15 -29 - 36 - 39 - 64 - 68 - 92 - 106 - 109 - 110 - 111 - 128 - 140 - 152 - 160 - 188 - 194 <br>-------------------------------------------------------------------------------------<br>HORARIOS DE ATENCIÓN <br>De lunes a viernes de 10 a 18 hs. <br>--------------------------------------------------------------------------------------<br>PHILIPS TELEVISION - TIENDA OFICIAL</p>")
    .withValue(6.199)
    .withImage(new ProductImage("", "https://http2.mlstatic.com/tv-led-32-philips-hd-mod-32phg510177-D_NQ_NP_606672-MLA31061756040_062019-O.webp", ""))
    .build()
    ,
    new ProductBuilder()
    .withName("Heladera Ciclica Gafa Hgf-357aw 281lt")
    .withDescription("<p>RETIRO EN SUCURSAL - GRATIS!!!!<br> ____________________________<br><br> Heladera Ciclica Gafa HGF-357AW 281Lt<br><br> Modelo: HGF-357AW<br>____________________________<br><br> Diseño<br>La Gafa HGF-357AW tiene un estilizado diseño exterior. En su interior, se encuentra dividida por diferentes compartimentos para optimizar la organización y almacenamiento de los víveres. Cuenta con bandejas rebatibles y transparentes; anaqueles desmontables en la puerta; balcones para envases; gaveta de frutas y verduras de acrílico de cristal de alta resistencia. También, tiene un compartimento con tapa, especial para fiambres y lácteos. El freezer viene equipado con Ice twister: dispensadores de hielo con bandeja almacenadora. <br><br>Capacidad<br>Su capacidad total de almacenamiento es de 280 litros. El espacio para refrigerador cuenta con 204 litros para ordenar alimentos y bebidas y el freezer tiene un total de 76 litros para congelados. <br><br>Consumo energético<br>La HGF-357AW cuenta con una clasificación energética clase A, que significa menos consumo de energía y más eficiente. A diferencia de otras heladeras convencionales, ayuda en el cuidado del medio ambiente.<br><br>Tecnología<br>Su sistema de descongelamiento automático facilita el limpiado de la heladera. Además, su potencia de temperatura puede regularse a gusto dependiendo del tipo y cantidad de alimentos que se quieran conservar y la época del año.<br><br> <br>____________________________<br><br>ESPECIFICACIONES<br><br> » Modelo: HGF-357AW<br> » Origen: ARGENTINA<br> » Garantia del Fabricante: 12 meses<br> » Color: Blanco<br> » Dispenser: No<br> » Display LCD: No<br> » Fabrica de hielo: No<br> » Alto: 143.3 cm<br> » Ancho: 60.9 cm<br> » Capacidad bruta: 281 Lts<br> » Profundidad: 61.5 cm<br> » Capacidad neta freezer: 76 Lts<br> » Capacidad neta refrigerador: 204 Lts<br> » Tipo de enfriamiento: Ciclico<br> » Panel de control: Mecánico Interno<br> » Luz interior: Sí<br> » Tipo de descongelamiento: Automatico<br> » Alarma de puerta abierta: No<br> » Puertas reversibles: No<br> » Control de temperatura: Manual<br> » Bloqueo seguridad de niños: No<br> » Clasificación energética: A<br> » Eficiencia energética Frío: A<br> » Protección antibacteriana: No<br> » Cantidad de estantes: 3<br> » Estantes regulables: Sí<br> » Material de estantes: Rejilla<br> » Compartimiento botella: Sí<br> » Compartimiento para huevos: Sí<br> » Compartimiento para frutas: Sí<br> » Compartimiento para verduras: Sí<br> » Compartimiento extrafrío: Sí<br> » Compartimentos en freezer: 3<br><br>____________________________<br><br>ENVÍOS<br><br> Envíos a todo el país (excepto Tierra del Fuego)<br><br> CABA y GBA<br> Te llegará un link a la mensajería para agendar tu pedido, según los cupos disponibles. Agenda la entrega según tu disponibilidad sin necesidad de comunicarte con nosotros!!<br><br> Interior del país<br> La entrega se hará efectiva dentro de los siguientes plazos:<br><br> » Provincia de Bs. As., Córdoba, Santa Fe, Misiones, Tucumán, Chubut, La Pampa, Salta, Jujuy, Chaco y Santiago del Estero - 8 días hábiles.<br> » Mendoza, Entre Ríos, Río Negro, Corrientes, Neuquén, Santa Cruz, San Juan, Catamarca, La Rioja y Formosa - 9 días hábiles.<br> » San Luis - 10 días hábiles.<br><br> De todos modos, el cumplimiento de dicho plazo depende de la frecuencia del correo en la zona.<br><br>Luego de realizada la compra te enviaremos la factura mediante mensajería.<br>____________________________<br><br> RETIRO EN SUCURSAL - GRATIS!!!!<br><br> PLAZOS DE RETIRO*<br> » CABA y GBA: a partir del 5to día HÁBIL<br> » INTERIOR: a partir del 7mo día HÁBIL<br> *Tené en cuenta que te va a llegar un mensaje en el momento que el producto esté disponible para retirar.<br><br> » REQUERIMIENTOS PARA EL RETIRO<br> Sólo podrá retirarlo el titular de la cuenta, el autorizado por vos, presentando el número de compra y DNI. También podrá hacerlo el titular de la tarjeta de crédito con su tarjeta y DNI en mano. <br><br>Nota: Sujeto a disponibilidad de stock.<br><br> ____________________________<br><br>PREGUNTAS FRECUENTES<br><br> ¿Cuándo voy a recibir mi producto?<br> Una vez facturada tu compra, si residís en CABA o GBA te llegará un link a la mensajería para agendar tu pedido, según los cupos disponibles. <br><br> Si estás en el interior, la entrega se hará efectiva dentro de los siguientes plazos:<br> » Provincia de Bs. As., Córdoba, Santa Fe, Misiones, Tucumán, Chubut, La Pampa, Salta, Jujuy, Chaco y Santiago del Estero - 8 días hábiles.<br> » Mendoza, Entre Ríos, Río Negro, Corrientes, Neuquén, Santa Cruz, San Juan, Catamarca, La Rioja y Formosa - 9 días hábiles.<br> » San Luis - 10 días hábiles.<br><br> De todos modos, el cumplimiento de dicho plazo depende de la frecuencia del correo designado en la zona.<br><br>¿Cuando puedo retirar mi compra de la sucursal?<br> Cuando tu compra ya este lista para retirar en la sucursal se te enviará un mensaje informándote para que vayas a buscarlo.<br><br>¿Qué tipo de factura hacen?<br>SOLO realizamos factura tipo B CONSUMIDOR FINAL, por este canal NO realizamos facturas A o B exentas.<br><br>¿Quién puede recibir el pedido en tu domicilio?<br>Cualquier persona mayor de edad puede recibir el producto. Es necesario que tenga el DNI en el momento de la entrega.<br><br>Hay stock del artículo?<br>Sí, hay stock. Si el producto está publicado quiere decir que lo tenemos disponible para enviártelo.<br><br>¿El producto tiene garantía?<br>Sí, todos nuestros productos son nuevos, tienen garantía oficial de la marca y se entregan en caja cerrada.<br><br>____________________________<br><br>DEVOLUCIONES Y CAMBIOS<br><br>Los términos y condiciones generales que se describen en Frávega, sección: Términos y Condiciones, se aplicarán a las compras de productos realizadas a Frávega S.A.C.I.e.I y a los servicios ofrecidos por él. Comercializa y distribuye por sí o por cuenta y orden de Frávega S.A.C.I.e.I<br><br>La devolución de productos se acepta dentro de los DIEZ (10) días corridos contados a partir de la fecha de recibida la mercadería, sin costo alguno de devolución. Pasado este período debe contactarse con el service correspondiente.<br><br>Es necesario que el producto esté en perfectas condiciones, con accesorios y empaques originales.<br><br>En todos los casos se deberá conservar la factura de compra y remito de entrega.<br><br>Los productos que son de uso personal o requieren instalación no tienen devolución una vez usados o instalados.<br><br>*No se aceptarán reclamos por daños estéticos y/o faltantes una vez firmado el remito conforme.<br><br>¿Cómo devolver o cambiar productos?<br>Los cambios y/o devoluciones deberán realizarse por teléfono al número que figura en su comprobante de compra enviado por email donde se te brindará la información y la solución más cómoda para tu conformidad.<br><br>El cambio de un producto podrás hacerlo dentro de los 3 días de recibida la mercadería, por otro de igual precio y de mismas características. De solicitar un cambio de producto por otro, de diferente importe y/o características, deberás solicitar primero la devolución y luego deberás realizar nuevamente la compra en el sitio oficial.</p>")
    .withValue(13.999)
    .withImage(new ProductImage("", "https://http2.mlstatic.com/heladera-ciclica-patrick-hpk135b01-277lt-D_NQ_NP_848604-MLA31013391123_062019-O.webp", ""))
    .build()
]

const questions = [
    [new Question("", "", "Hola! es apata para piñas? Saludos!", ""), new Question("", "", "Hola es apta para sandias?", ""), new Question("", "", "Hola es apta para melo?", "")],
    [new Question("", "", "Hola! es 1080????", ""), new Question("", "", "Hola! es smart?", "")],
    [new Question("", "", "Hola! es ciclica la herladera???", "")]
]
const answers = [
    [new Answer("", "", "Si, es apto para licuar piñas", ""), new Answer("", "", "Si, es apto para licuar sandia", ""), new Answer("", "", "Si, es apto para licuar melon", "")],
    [new Answer("", "", "No, el producto tiene una resolucion de 720p no 1080p", ""), new Answer("", "", "No, el producto no es smart", "")],
    [new Answer("", "", "Si, como indicamos en el nombre del producto la heladera es ciclica", "")]
]

const userTableInsert = 
    `CREATE TABLE ${User.tableName} (
        id serial PRIMARY KEY,
        first_name text,
        last_name text,
        direction text,
        dni text,
        password text,
        email text,
        birthdate date 
    );`

const clientTableInsert = 
    `CREATE TABLE ${Client.tableName} (
        id serial PRIMARY KEY,
        seller_calification text,
        user_id integer REFERENCES ${User.tableName}(id)
    );`

const adminTableInsert =
    `CREATE TABLE ${Admin.tableName} (
        id serial PRIMARY KEY,
        role_id integer REFERENCES ${Role.tableName}(id),
        user_id integer REFERENCES ${User.tableName}(id)
    );`

const productTableInsert =
    `CREATE TABLE ${Product.tableName} (
        id serial PRIMARY KEY,
        name text,
        value text,
        description text,
        seller_id integer REFERENCES ${Client.tableName}(id)
    );`

const cartTableInsert = 
    `CREATE TABLE ${Cart.tableName} (
        id serial PRIMARY KEY,
        client_id integer REFERENCES ${Client.tableName}(id),
        product_id integer REFERENCES ${Product.tableName}(id)
    );`

const favouritesTableInsert = 
    `CREATE TABLE favourites_table (
        id serial PRIMARY KEY,
        "client_id" integer REFERENCES ${Client.tableName}(id),
        "product_id" integer REFERENCES ${Product.tableName}(id)
    );`

const productImageTableInsert = 
    `CREATE TABLE ${ProductImage.tableName}(
        id serial PRIMARY KEY,
        image text,
        product_id integer REFERENCES ${Product.tableName}(id)
    );`    

const reviewTableInsert = 
    `CREATE TABLE ${Review.tableName} (
        id serial PRIMARY KEY,
        buyer_id integer REFERENCES ${Client.tableName}(id),
        description text,
        calification integer
    );`

const productReviewTableInsert = 
    `CREATE TABLE product_review_table (
        id serial PRIMARY KEY,
        "product_id" integer REFERENCES ${Product.tableName}(id),
        "review_id" integer REFERENCES ${Review.tableName}(id)
    );`

const roleTableInsert = 
    `CREATE TABLE ${Role.tableName} (
        id serial PRIMARY KEY,
        name text,
        level text
    );`

const saleTableInsert = 
    `CREATE TABLE sale_table (
        id serial PRIMARY KEY,
        "product_id" integer REFERENCES ${Product.tableName}(id),
        "buyer_id" integer REFERENCES ${Client.tableName}(id),
        "review_id" integer REFERENCES ${Review.tableName}(id)
    );`

const questionTableInsert = 
    `CREATE TABLE ${Question.tableName} (
        id serial PRIMARY KEY,
        "product_id" integer REFERENCES ${Product.tableName}(id),
        "question" text,
        "user_id" integer REFERENCES ${User.tableName}(id)
    );`

const answerTableInsert = 
    `CREATE TABLE ${Answer.tableName} (
        id serial PRIMARY KEY,
        "question_id" integer REFERENCES ${Question.tableName}(id),
        "answer" text,
        "user_id" integer REFERENCES ${User.tableName}(id)
    );`

const tables = [
    saleTableInsert,
    productReviewTableInsert,
    reviewTableInsert,
    productImageTableInsert,
    favouritesTableInsert,
    cartTableInsert,
    answerTableInsert,
    questionTableInsert,
    productTableInsert,
    clientTableInsert,
    adminTableInsert,
    roleTableInsert,
    userTableInsert
    ]


const createTables = async (querys: string[], pool: Pool) => {
    if(querys.length == 0) return Promise.resolve()
    else {
        const query = querys.pop()
        const client = await pool.connect()
        try {
            await client.query(query)
            client.release()
            return createTables(querys, pool)
        } catch (err) {
            client.release()
            //This code means that the table already exists
            if(err.code == "42P07"){
                return createTables(querys, pool)
            } else {
                console.error(err);
                return "Error " + err
            }
        }
    }
} 

export const boot = async (pool: Pool) => {
    await createTables(tables, pool)
    console.log("Tables created")
    const futureRoles = roles.map(r => insertRole(pool, r))
    Promise.all(futureRoles).then( async (roleIDs) => {
        console.log("Roles created")
        admin.role = new Role(roleIDs[5], "", 0)  
        await insertAdmin(pool, admin)
        console.log("Admin created")
    })
    const clientID =await insertClient(pool, client)
    console.log("Client created")
    const sellerID = await insertClient(pool, seller.build())
    console.log("Seller created")
    const sellerWithID = seller.withID(sellerID).build()
    
    const productsWithSeller =  products.map(async (p, index) => {
        p.seller = sellerWithID
        await insertProduct(pool, p).then((pId) => {
            const qs = questions[index].map(q => new Question(q.id, pId, q.question, clientID))
            const ans = answers[index].map(a => new Answer(a.id, a.questionId, a.answer, sellerID))
            qs.map(async (q, qIndex) => {
                insertQustionAnswer(pool, q, ans[qIndex])
            })  
        })
    })
    Promise.all(productsWithSeller).then(() => { 
        console.log("Products created")
        return Promise.resolve()
    })

}



