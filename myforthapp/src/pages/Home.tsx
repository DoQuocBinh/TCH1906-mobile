import { IonContent, IonHeader, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { debug } from 'console';
import { useEffect, useState } from 'react';
import { getAllCustomers } from '../databaseHandler';
import { Customer } from '../models';

const Home: React.FC = () => {
  //list of customers-> will be used in the List component
  const [customers, setCustomers] = useState<Customer[]>([]);

  async function fetchData() {
    let allCustomers = await getAllCustomers();
    setCustomers(allCustomers)
    console.log(allCustomers)
  }
  //it will run at least once every time the page is rendered
  useEffect(() => {
    fetchData();
  }, [])

  async function refreshTheData(event: any) {
    await fetchData() //to update customer list again
    setTimeout(() => {  //pause some time to show the effect: refreshing
      event.detail.complete(); //done the refreshing=>effect will disapear
      console.log('Refresh completed!')
    }, 1000) //1 second to show refresh icon
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {customers &&
          <IonList>
            {
              customers.map((c, i) =>
                <IonItem button key={i} 
                    routerLink={'/details/' + c.id}>{c.name}</IonItem>
              )
            }
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};
export default Home;