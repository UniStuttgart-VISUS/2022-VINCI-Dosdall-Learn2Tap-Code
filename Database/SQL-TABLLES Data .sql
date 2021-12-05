-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: tapstrapapp
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `gamesentence`
--

LOCK TABLES `gamesentence` WRITE;
/*!40000 ALTER TABLE `gamesentence` DISABLE KEYS */;
INSERT INTO `gamesentence` VALUES (1,'b build.','v addAll: es.<br>RTFlowLayout on: es.<br>v run.'),(2,'stream','b := RTGrapher new.<br>b extent: 400 @ 200.<br>RTShape withAllSubclasses'),(3,'foo','b open.<br>v := b view.<br>v run.'),(4,'[ : p |','@<br>(RTMenuActivable new<br>action: #inspect;<br>item: \'browse class\' action: [ :e | e model browse ]).'),(5,'self','nbOfNodes := 40.<br>nbOfRandomEdges := 40.<br>nodes := 1 to: nbOfNodes.'),(6,'Pharo','edges := (1 to: nbOfRandomEdges)<br>collect: [ :notUsed |<br>nodes atRandom -> nodes atRandom ].'),(7,'true','b := RTMondrian new.<br>b shape circle color:<br>(Color black alpha: 0.5).<br>b nodes: nodes.'),(8,'false','v addAll: es.<br>RTFlowLayout on: es.<br>v run.'),(9,':=','shape := RTEllipse new<br>size: #numberOfMethods;<br>color: n.'),(10,'\'foo\'','classes := RTObject<br>withAllSubclasses.<br>v := RTView new.<br>v @ RTDraggableView.'),(11,'new','maxValue := 40.<br>spaceBetweenLine := 50.<br>lineHeight := 150.'),(12,'>>','view := RTView new.<br>view<br>addAll: (RTBox elementsOn:<br>Collection withAllSubclasses) @ RTDraggable.'),(13,'[^ 1].','view: view;<br>objects: Collection withAllSubclasses;<br>connectFrom: #superclass to: #yourself.'),(14,'add','numberOfColumns := 10.<br>numberOfLines := 100.<br>values := OrderedCollection new.'),(15,'Class','if: #even fillColor:<br>Color lightGray;<br>if: #odd fillColor:<br>Color purple.'),(16,'var','n < 8<br>ifTrue: [ Array with: n + 1<br>with: n + 2 ]<br>ifFalse: [ #() ] ];\n'),(17,'3+4','r := Random new.<br>createList := [ :size :d1 :d2 |<br> (1 to: size) collect:<br>[ :i | d1 + (r next * (d2 - d1)) ] ].'),(18,'#(4 2)','(1 to: 10)<br>do: [ :i |<br>| ds |<br>b add: ds ].'),(19,'if( )','b := RTGrapher new.<br>ds := RTBoxPlotDataSet new.<br>ds points: (createList value:<br>20 value: 0 value: 20).'),(20,'for','b := RTGrapher new.<br>b extent: 400 @ 200.<br>RTShape withAllSubclasses'),(21,'22/4','do: [ :cls |<br>ds := RTBoxPlotDataSet new.<br>b add: ds ].'),(22,'3 * 9','view := RTView new.<br>coll := #(50 60 80 100 85 10 35).<br>n := RTMultiLinearColorForIdentity<br> new objects: coll.'),(23,'World!','	RTFlowLayout<br>new applyOn: view elements.<br>view elements do:<br>[ :e | e @ (RTPopup text: [ :el | el ]) ].'),(24,'do:','b := RTAxisAdaptedBuilder new.<br>b view: view.<br>b margin: 20.'),(25,'r:0.2','data := (1 to: 20)<br>collect: [ :v | 10 atRandom - 5 ].<br>b := RTGrapher new.<br>b extent: 300 @ 200.'),(26,'g: 0.3','ds := RTData new.<br>ds interaction popup.<br>ds points: data.'),(27,'b: 0','ds barShape width: 8;<br>color: (Color green alpha: 0.3);<br>if: [ :value | value < 0 ]<br>fillColor: (Color red alpha: 0.3).'),(28,'put','b shape circle<br>color: [ :value |<br>n rtValue: value kiviatNode named ];<br>size: 10.'),(29,'expr','b addMetric: #numberOfLinesOfCode.<br>b addMetric: #numberOfMethods.<br>b addMetric: #numberOfVariables.<br>b build.'),(30,'key','b := RTMondrian new.<br>b shape circle color:<br>(Color black alpha: 0.5).<br>b nodes: nodes.'),(31,'7 = 7','b shape line color:<br>(Color gray alpha: 0.3).<br>b edges source: edges connectFrom:<br> #key to: #value.'),(32,'while','nodes := 1 to: nbOfNodes.<br>edges := (1 to: nbOfRandomEdges)<br>collect: [ :notUsed |<br>nodes atRandom -> nodes atRandom ].'),(33,'show','nbOfNodes := 40.<br>nbOfRandomEdges := 40.'),(34,'each','b := RTKiviatBuilder new.<br>b objects:<br> RTAbstractCircleLayout<br> withAllSubclasses.\n'),(35,'$!','n := RTMultiLinearColorForIdentity<br>new objects: b objects.'),(36,'1 to:','b	extent: 400 @ 400;<br>explore: 1<br>using: [ :n |<br>weight: [ :n | n ].'),(37,'do: ','view @ RTDraggableView.<br>view edges do:<br>[ :e | e trachelShape pushBack ].'),(38,'[:i |','RTEdgeBuilder new<br>RTTreeLayout on:<br>view elements edges:<br>view edges.'),(39,'aCol','[ t := OrderedCollection new.<br>numberOfColumns timesRepeat:<br>[ t add: maxValue atRandom ].<br>values add: t ].'),(40,'at:i',NULL),(41,'int',NULL),(42,'String',NULL),(43,'#lit',NULL),(44,'exp1.',NULL),(45,'x + 2',NULL),(46,'(abc)',NULL),(47,'#(123)',NULL),(48,'But',NULL),(49,'First',NULL),(50,'AVAR',NULL),(51,'boolean',NULL),(52,'Tap',NULL),(53,'count',NULL),(54,'Object',NULL),(55,'assert',NULL),(56,'super',NULL),(57,'nil',NULL),(58,'this',NULL),(59,'Context',NULL),(60,'any',NULL),(61,'close',NULL);
/*!40000 ALTER TABLE `gamesentence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'⬤ ○○○○','○○○○ ⬤','e','One Letter Uppercase','Shift (+)','',NULL,'1',NULL,'Find class','Alt f c'),(2,'○ ⬤○○○','○○○⬤ ○','t','Uppercase','Shift (+) HOLD','',NULL,'2',NULL,'Find Method','Alt f m'),(3,'○ ○⬤○○','○○⬤○ ○','a',':','a Backspace Shift :','','a Backspace Shift : Backspace ;','3',NULL,'Create New Package','Alt n p'),(4,'○ ○○⬤○','○⬤○○ ○','l','.','l Backspace .','Turn off',NULL,'4',NULL,'Create New Class','Alt n c'),(5,'○ ○○○⬤','⬤ ○○○○','n','/','n Backspace /','^','n Backspace / Backspace Shift ^','5',NULL,'Remove Package','Alt r p'),(6,'⬤ ⬤○○○','○○○⬤ ⬤','o','Take a pic',NULL,'Turn on',NULL,'<-','ArrowLeft','Remove class','Alt r c'),(7,'○ ⬤⬤○○','○○⬤⬤ ○','i','j','i Backspace j','{','i Backspace j Backspace Shift {','Arrow up','ArrowUp','Accessors','Alt h a'),(8,'○ ○⬤⬤○','○⬤⬤○ ○','s','+','s Backspace Shift +','#','s Backspace Shift + Backspace Shift #','->','ArrowRight','Initialize','Alt h i'),(9,'○ ○○⬤⬤','⬤⬤○○ ○','p','~','p Backspace Shift ~','',NULL,'9',NULL,'Create Subclass','Alt h n s'),(10,'⬤ ○⬤○○','○○⬤○ ⬤','h','=','h Backspace =','$','h Backspace = Backspace Shift $','Marking','L-Shift (+) HOLD','CreateTestMethodeAndJumpToIt','Alt h j'),(11,'○ ⬤○⬤○','○⬤○⬤ ○','m','(','m Backspace Shift (',')','m Backspace Shift ( Backspace Shift )','8',NULL,'ClassSideView','Alt t c'),(12,'○ ○⬤○⬤','⬤○⬤○ ○','z','',NULL,'',NULL,'8',NULL,'',NULL),(13,'⬤ ○○⬤○','○⬤○○ ⬤','k','-','k Backspace -','*','k Backspace - Backspace Shift *','Arrow down','ArrowDown','InstanceSideView','Alt t i'),(14,'○ ⬤○○⬤','⬤○○⬤ ○','b','[','b Backspace [',']','b Backspace [ Backspace ]','7',NULL,'Hierarchy View','Alt t h'),(15,'⬤ ○○○⬤','⬤○○○ ⬤','v','w','v Backspace w','y','v Backspace w Backspace y','6',NULL,'FlatView','Alt t f'),(16,'⬤ ○⬤○⬤','⬤○⬤○ ⬤','w','',NULL,'',NULL,'L-Window n',NULL,'',NULL),(17,'○ ⬤⬤⬤⬤',' ⬤⬤⬤⬤ ○','r','c','r Backspace c','ShowKeyboard',NULL,'0',NULL,'OpenAPlaygroundWindow','Control o w'),(18,'⬤ ○⬤⬤⬤','⬤⬤⬤○ ⬤','d','z','d Backspace z','}','d Backspace z Backspace Shift }','ToggleBetweeenMapping',NULL,'executeTheScript','Control d'),(19,'⬤ ⬤○⬤⬤','⬤⬤○⬤ ⬤','c','_','c Backspace Shift _','?','c Backspace Shift _ Backspace Shift ?','Pase','Control v','OpenMonticelloBrowser','Control o b'),(20,'⬤ ⬤⬤○⬤','⬤○⬤⬤ ⬤','j','',NULL,'',NULL,'',NULL,'',NULL),(21,'⬤ ⬤⬤⬤○','○⬤⬤⬤ ⬤','u','|','u Backspace Shift |','%','u Backspace Shift | Backspace Shift %','RightMouseClick','ContextMenu','PrintShowAJSONRepresentationOfTheView','Control p'),(22,'⬤ ○⬤⬤○','○⬤⬤○ ⬤','g','\"','g Backspace Shift \"','@','g Backspace Shift \" Backspace Shift @','Copie','Control c','ChangeTheIPAndPort','Control n'),(23,'○ ⬤○⬤⬤','⬤⬤○⬤ ○','x','&','x Backspace Shift &','\\','x Backspace Shift & Backspace Shift \\ ',',',NULL,'enableServerMode','Control w'),(24,'⬤ ⬤○⬤○','○⬤○⬤ ⬤','f','VoiceOver',NULL,'',NULL,';',NULL,'safeFile','Control s'),(25,'○ ⬤⬤○⬤','⬤○⬤⬤ ○','y','',NULL,'',NULL,'',NULL,NULL,NULL),(26,'⬤ ○○⬤⬤','⬤⬤○○ ⬤','Enter','\'','Enter Backspace \'','\"','Enter Backspace \' Backspace Shift \"','Enter',NULL,'Enter','Enter'),(27,'⬤ ⬤○○⬤','⬤○○⬤ ⬤','q','<','q Backspace Shift <','>','q Backspace Shift < Backspace Shift >','Escape',NULL,'ESC','Escape'),(28,'⬤ ⬤⬤○○','○○⬤⬤ ⬤','ToggleShiftMode','ToggleShiftModeLock',NULL,'',NULL,'',NULL,'ToggleShiftMode',NULL),(29,'○ ⬤⬤⬤○','○⬤⬤⬤ ○','Backspace',NULL,NULL,'',NULL,'Backspace',NULL,'Backspace',NULL),(30,'○ ○⬤⬤⬤','⬤⬤⬤○ ○','ToggleSwitchMode','',NULL,'',NULL,'ToggleSwitchMode',NULL,'ToggleSwitchMode',NULL),(31,'⬤ ⬤⬤⬤⬤','⬤⬤⬤⬤ ⬤','Space','Tab','Backspace Tab','',NULL,'Space',NULL,'Space',NULL);
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `overviewmenu`
--

LOCK TABLES `overviewmenu` WRITE;
/*!40000 ALTER TABLE `overviewmenu` DISABLE KEYS */;
INSERT INTO `overviewmenu` VALUES (1,'ONE FINGER DOWN','e t a l n',': . /','^ { #','FindClass FindMethode CreateNewPackage CreateNewClass RemovePackage','1 2 3 4 5'),(2,'TWO FINGERS TOGETHER','o i s p','j + ~','$ ) * ]','RemoveClass Accessors Initialize CreateSubclass','← ↑ → 9'),(3,'TWO FINGERS SKIPPING ONE','h m z','( = - [','y } ? %','CreateTestMethodeAndJumpToIt ClassSideView','6 7 8 ↓ '),(4,'TWO FINGERS SKIPPING TWO','k b','w c z _ |','@ \\ ; >','InstanceSideView HierarchyView','0 Pase RightMouseClick Copie '),(5,'LOOKES LIKE Y AND W','v w','\" &',NULL,'FlatView',', ;'),(6,'ONE FINGER UP','r d c j u',' \' <  Tab',NULL,'OpenAPlaygroundWindow ExecuteTheScript OpenMonteicelloBrowser Print/ShwoAJSONReperesentationOfTheView','Enter ESC Backspace'),(7,'ONE FINGER CHASING TWO','g x',NULL,NULL,'changeTheIPAndPort enable\"ServerMode\"',NULL),(8,'TWO FINGERS CHASING ONE','f y',NULL,NULL,'SafeFile Enter Esc',NULL),(9,'THREE FINGERS SKIPPING TWO','Enter q Backspace',NULL,NULL,NULL,NULL),(10,'THREE FINGERS TOGETHER',NULL,NULL,'',NULL,NULL),(11,'ALL FINGERS TOEGEHTER',NULL,NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `overviewmenu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 13:00:26
