import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCustomer } from '../databaseHandler';
import { Customer } from '../models';

interface ParamId {
  id: string
}

const Details: React.FC = () => {
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const { id } = useParams<ParamId>()

  async function fetchData() {
    var r = await getCustomer(Number.parseInt(id));
    setCurrentCustomer(r);
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {currentCustomer &&
          <IonList>
            <IonItem>{currentCustomer.name}</IonItem>
            <IonItem>{currentCustomer.country}</IonItem>
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};
export default Details;