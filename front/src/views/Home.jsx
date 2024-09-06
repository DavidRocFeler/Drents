import NavBar from "../components/NavBar"
import MainCover from '../components/MainCover'
import LinkHoTn from '../components/LinkHomeAndTen'
import MainProperties from '../components/MainProperties'
import FooterForms from "../components/FooterForms"

const Home = () => {
    return(
        <>
        <NavBar/>
        <MainCover/>
        <LinkHoTn/>
        <MainProperties/>
        <FooterForms/>
        </>
    )
}

export default Home;

/* 
componentes de home: 
header.jsx
linkHomeAndTen.jsx
MainProperty.jsx
FooterForms.jsx
*/

// const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const cardsProperties = document.getElementById('cardsProperties');
//     if (cardsProperties) {
//       cardsProperties.className = `page-${currentPage}`;
//     }
//   }, [currentPage]);

//   const handleNextPage = () => {
//     console.log('Next button clicked');
//     if (currentPage < 2) {
//       console.log('Moving to the next page');
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     console.log('Previous button clicked');
//     if (currentPage > 1) {
//       console.log('Moving to the previous page');
//       setCurrentPage(currentPage - 1);
//     }
//   };