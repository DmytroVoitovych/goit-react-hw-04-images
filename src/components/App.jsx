import { useState, useEffect, } from "react";
import { usePrevious } from "react-delta";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from 'components/Button/Button';
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Notfound } from "./404/404"; 
import { Skeleton } from "./Skeleton/Skeleton";
import { BtnUandD } from "./UpDown/BtnUandD";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Fetch } from "js/fetch"; 

export const App = () => {
  
  const [locate, setLocate] = useState(0);
  const [value, setValue] = useState(null);
  const [item, setItem] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [large, setLarge] = useState(null);

  const prevV = usePrevious(value); 
  const prevP = usePrevious(page);
 
  const funcToglle = (e, large, alt) => {
    setShowModal(!showModal);
    setLarge([large, alt]);
  };

  const funcToglleEsc = () => setShowModal(!showModal);
      
  const funcSubmit = (e) => {
    
    e.preventDefault(); //блок обновы
    const input = e.target.input.value.toLowerCase().trim();
      
    if (input !== '' && input !== value) {
         
      setValue(input); setPage(1); setItem([]);
      e.target.reset();
    }
         
    else if (input === value) {
      e.target.reset();
      Report.failure('Error', `You already have the result with this query on the page ${value}`);
    }
    else {
      Report.failure('Error', ' The fields must be filled in');
    }
  };

   const funcScroll = () => { setLocate(window.scrollY);};

  useEffect(() => {
        window.addEventListener("scroll", funcScroll);
        return () => window.removeEventListener("scroll", funcScroll);
  }, []);
           
  useEffect(() => {
    if (value) { // проверка для того что бы не было вызова при пустой строке
      if (value !== prevV|| page !== prevP) {
     
        setStatus('pending');
          
        Fetch(value, page).then(itemH => {
          setItem(() => item.concat(...itemH.hits));
          if (itemH.hits.length > 0) { return setStatus('resolved'); }

          else if (itemH.totalHits === item.length && item.length !== 0) {
            setStatus('idle');
            Notify.info('There are no more images.');
          }
          else if (itemH.hits.length === 0) {
            setStatus('rejected');
            return Promise.reject(new Error(`There are no images for this query:  ${value} `),);
          }
        })
          .catch(errorH => { setError(() => errorH); setStatus('rejected'); Report.failure('Error', error); });
      }
    
      else { return; }
    }
    
  },[value, page, item, error, prevV, prevP]); // item no need observ //убрал ошибку по не надобности мне следить за item 
     
  const addPage = () => setPage(prevState => prevState + 1);
  
  return (
   
    <>
    
      <Searchbar submit={funcSubmit}/> 
      <div
        style={{
          fontSize: 40,
          color: '#010101',
          scrollBehavior: "smooth",
          padding: '10px 15px',
        }} >
         
         { status === 'pending' && item.length === 0 ?<Skeleton/>:<ImageGallery status={status} item={item} val={value} modal={funcToglle} />}
        {status === 'resolved'&& item.length >= 12  && <Button click={addPage} status={status} />}
        {status === 'pending' && item.length > 0 && <Loader />}
          {status === 'rejected' && item.length === 0 && <Notfound /> }
        </div>
        {showModal && < Modal onClose={funcToglleEsc} large={large} />}
      {<BtnUandD locate={locate} item={item} />} 
      </>);
  };

