import { IonButton, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar, useIonToast } from '@ionic/react';
import { useState } from 'react';
import { personAdd } from 'ionicons/icons'
import { insertCustomer } from '../databaseHandler';
const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [dateofBirth, setDateOfBirth] = useState(new Date().toISOString());

  const [present,dismiss] = useIonToast();

  const formatDate = (isoDateString: string) => {
    return new Date(isoDateString).toLocaleDateString("vi-VN");
  }

  function registerHandler() {
    var customer = {
      name: name, country: country, gender: gender,
      languages: languages, dateofBirth: dateofBirth
    }
    insertCustomer(customer).then(()=>{
        present("Insert customer successfully!",3000)
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Country</IonLabel>
            <IonSelect onIonChange={e => setCountry(e.detail.value)}>
              <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
              <IonSelectOption value="The USA">The USA</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Gender</IonLabel>
            <IonRadioGroup onIonChange={e => setGender(e.detail.value)}>
              <IonItem lines="none">
                <IonLabel>Male</IonLabel>
                <IonRadio value="Male" />
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Female</IonLabel>
                <IonRadio value="Female" />
              </IonItem>
            </IonRadioGroup>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Langagues can speak</IonLabel>
            <IonSelect multiple={true} onIonChange={e => setLanguages(e.detail.value)}>
              <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
              <IonSelectOption value="English">English</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Date of Birth</IonLabel>
            <IonDatetime value={dateofBirth}
              onIonChange={e => setDateOfBirth(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonButton onClick={registerHandler}  color="secondary" expand="block">
            <IonIcon slot="icon-only" icon={personAdd}></IonIcon>
          </IonButton>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Register;
