import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Home.css';

interface Customer{
  id: number,
  customerName: string,
  address: string
}
const Home: React.FC = () => {
  const [customer,setCustomer] = useState<Customer[]>([])
  
  function fetchData(){
    //produce some dummy data for customer
    var dummyCustomers = getDataFromDatabase();
    setCustomer(dummyCustomers)
  }
  function searchCustomer(searchText:string){
    console.log("you are searching for: " + searchText) 
    var filter = "customerName";
    //perform partially match search
    const customerFromDB = getDataFromDatabase()
    var filteredData = customerFromDB.filter(function(obj) {
      return obj.customerName.includes(searchText);
    });
    console.log(filteredData)
    setCustomer(filteredData)
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Demo search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Search</IonLabel>
          <IonInput onIonChange={e=>searchCustomer(e.detail.value!)}></IonInput>
        </IonItem>       
        {customer &&
          <IonList>
            {customer.map(c=>
              <IonItem key={c.id}>{c.customerName}</IonItem>
            )}
          </IonList>
        }       
      </IonContent>
    </IonPage>
  );
};
export default Home;
function getDataFromDatabase() {
  var dummyCustomers = [];
  dummyCustomers.push({ id: 1, customerName: "Bin", address: 'Hungury' });
  dummyCustomers.push({ id: 2, customerName: "Viet", address: 'Viet Nam' });
  dummyCustomers.push({ id: 3, customerName: "Dell", address: 'The USA' });
  dummyCustomers.push({ id: 4, customerName: "Binnn", address: 'Hungury' });
  dummyCustomers.push({ id: 5, customerName: "Binnnn", address: 'Hungury' });
  return dummyCustomers;
}

