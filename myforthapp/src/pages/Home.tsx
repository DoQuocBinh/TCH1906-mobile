import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { debug } from 'console';
import { useEffect, useState } from 'react';
import { getAllCustomers } from '../databaseHandler';
import { Customer } from '../models';

const Home: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  //it will run at least once every time the page is rendered
  useEffect(() => {
    async function fetchData() {
      let allCustomers = await getAllCustomers();
      setCustomers(allCustomers)
      console.log(allCustomers)
    }
    fetchData();
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {customers &&
          <IonList>
            {
              customers.map((c,i)=>
                <IonItem key={i}>{i + ". " + c.name}</IonItem>
                )
            }
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};
export default Home;