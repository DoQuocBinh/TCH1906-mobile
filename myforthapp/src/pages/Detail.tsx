import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCustomer,deleteCustomer } from '../databaseHandler';
import { Customer } from '../models';
import {trashBin} from 'ionicons/icons'

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
  function formatVNDate(isoDate:string){
    return new Date(isoDate).toLocaleDateString("vi-VN")
  }
  function handleDelete(){
    //call database handle to delete the current customer
    deleteCustomer(Number.parseInt(id))
    alert("deletion done!")
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonIcon onClick={handleDelete} icon={trashBin} slot="end"></IonIcon>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {currentCustomer &&
          <IonList>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Name</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>{currentCustomer.name}</IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Country</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>{currentCustomer.country}</IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Gender</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>{currentCustomer.gender}</IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Languages</big>
              </IonLabel>
            </IonItemDivider>
            <IonList>
              {
                currentCustomer.languages.map((lang, i) =>
                  <IonItem key={i}>{lang}</IonItem>
                )
              }
            </IonList>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Date of Birth</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>{formatVNDate(currentCustomer.dateofBirth)}</IonItem>
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};
export default Details;