import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getCustomer, deleteCustomer,updateCustomer} from '../databaseHandler';
import { Customer } from '../models';
import { trashBin } from 'ionicons/icons'

interface ParamId {
  id: string
}

const Details: React.FC = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [dateofBirth, setDateOfBirth] = useState(new Date().toISOString());

  const history = useHistory();

  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const { id } = useParams<ParamId>()


  async function fetchData() {
    var result = await getCustomer(Number.parseInt(id));
    setCurrentCustomer(result);
    setName(result.name!)
    setCountry(result.country!)
    setGender(result.gender!)
    setLanguages(result.languages!)
    setDateOfBirth(result.dateofBirth!)
  }
  function formatVNDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString("vi-VN")
  }
  function updateHandle(){
    //call databaseHandler to update the current customer
    var customer = {
      id: Number.parseInt(id), name: name, country: country, gender: gender,
      languages: languages, dateofBirth: dateofBirth
    }
    updateCustomer(customer);
    alert('Update done!')
  }
  async function handleDelete() {
    //call databaseHandle to delete the current customer
    let r = window.confirm("Are you sure to delete this ");
    console.log('your action',r)
    if (!r) {
      alert("You cancelled!")
    } else {
      await deleteCustomer(Number.parseInt(id));
      history.goBack();
    }
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
            <IonItem>
              <IonInput onIonChange={e => setName(e.detail.value!)}
                value={name}></IonInput>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Country</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonSelect value={country} onIonChange={e => setCountry(e.detail.value)}>
                <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
                <IonSelectOption value="The USA">The USA</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Gender</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonRadioGroup value={gender} onIonChange={e => setGender(e.detail.value)}>
                <IonItem lines="none">
                  <IonLabel><small>Male</small></IonLabel>
                  <IonRadio value="Male" />
                </IonItem>
                <IonItem lines="none">
                  <IonLabel><small>Female</small></IonLabel>
                  <IonRadio value="Female" />
                </IonItem>
              </IonRadioGroup>
            </IonItem>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Languages</big>
              </IonLabel>
            </IonItemDivider>
            <IonSelect value={languages} multiple={true} onIonChange={e => setLanguages(e.detail.value)}>
              <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
              <IonSelectOption value="English">English</IonSelectOption>
            </IonSelect>
            <IonItemDivider color="secondary">
              <IonLabel>
                <big>Date of Birth</big>
              </IonLabel>
            </IonItemDivider>
            <IonItem>
              <IonDatetime value={dateofBirth}
                onIonChange={e => setDateOfBirth(e.detail.value!)}></IonDatetime>
            </IonItem>
          </IonList>
        }
        <IonButton onClick={updateHandle} expand="block" color="warning">Update</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Details;
