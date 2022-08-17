import React from "react";
// import { funcSubmit } from "./Searchbar/submit";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from 'components/Button/Button';
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Notfound } from "./404/404"; 
import { Skeleton } from "./Skeleton/Skeleton";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



export class App extends React.Component {

  state = {
    value: null,
    item: [],
    status: 'idle',
    page: 1,
    error: null,
    showModal: false,
    large: ''
        
  }
 
  funcToglle = (e, large, alt) => {
     this.setState(({ showModal }) =>
      ({ showModal: !showModal, large: [large, alt], })
    );

   
  };

    funcToglleEsc = (e,) => {
       
    this.setState(({ showModal }) =>
      ({ showModal: !showModal, })
    );
  
  };
      
  funcSubmit = (e) => {
    const { value } = this.state;
      e.preventDefault(); //блок обновы
         
       const input = e.target.input.value.toLowerCase().trim();
      
        if (input !== '' && input !== value) {
            
            
            this.setState({ value: input, page: 1, item:[] });
            e.target.reset(); 
        }
         
        else if (input === value) {
          e.target.reset(); 
          Report.failure('Error',`You already have the result with this query on the page ${value}`); 
      }
      
      
         else {
            Report.failure('Error',' The fields must be filled in');
        }
        
       
    };

    
    
  componentDidUpdate(prevProps, prevState) {
   const {value, page,} = this.state;
    
    if (prevState.value !== value || prevState.page !== page) {
       
      this.setState({ status: 'pending' });
        
          
      fetch(`https://pixabay.com/api/?key=28460134-7b12f16a69bff4fc5524ed994&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) { return response.json(); }

          else {
            return Promise.reject(new Error(`There are no images for this query:  ${value} `),);
          }
        })
        .then(item => {
          this.setState({ item: this.state.item.concat(...item.hits), });  if (item.hits.length > 0) { return this.setState({ status: 'resolved', }); }
          else if(item.totalHits ===  this.state.item.length && this.state.item.length !== 0 ) {
            this.setState({ status: 'idle', });
            Notify.info('There are no more images.');
          }
          else if (item.hits.length === 0) {
            this.setState({ status: 'rejected', });
            return Promise.reject(new Error(`There are no images for this query:  ${value} `),);
            
          }
          
        })
        .catch(error => { this.setState({ error, status: 'rejected', }); Report.failure('Error', this.state.error); });
      
       
    }
    
    else { return; }       
    }
     
  addPage = (page) => this.setState((prevState, prevProps) => ({ page: prevState.page + 1, }));
  
  

  render() {
    
    const {status, item, large, value, showModal } = this.state;

    return (
      <>
      <Searchbar submit={this.funcSubmit} change={this.funcChange}  /> 
      <div
        style={{
          fontSize: 40,
          color: '#010101',
          scrollBehavior: "smooth",
          padding: '10px 15px',
        }}
      >
         
         { status === 'pending' && item.length === 0 ?<Skeleton/>:<ImageGallery status={status} item={item} val={value} modal={this.funcToglle} />}
        {status === 'resolved'&& item.length >= 12  && <Button click={this.addPage} status={status} />}
        {status === 'pending' && item.length > 0 && <Loader />}
          {status === 'rejected' && item.length === 0 && <Notfound /> }
        </div>
        {showModal && < Modal onClose={this.funcToglleEsc} large={large} />}

      </>);
  };
};
