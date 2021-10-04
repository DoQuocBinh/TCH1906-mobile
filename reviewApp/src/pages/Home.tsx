import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getEmployees, insertEmployee } from '../databaseHandler';
import './Home.css';

interface Employee {
  id?: number,
  name: string,
  gender: string
}

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('')
  const [employees, setEmployees] = useState<Employee[]>([])

  async function fetchData() {
    //example for search
    // var nameToFind = 'Trang'
    // const result = await getEmployees()
    // const result2 = result.filter(e=>e.name==nameToFind)
    // setEmployees(result2)
    
    const result = await getEmployees()
    setEmployees(result)
  }

  async function handleSave() {
    const emp = { name: name, gender: gender }
    await insertEmployee(emp)
    alert('Insert Ok!')
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Review App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput onIonChange={(e) => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Gender</IonLabel>
            <IonSelect onIonChange={(e) => setGender(e.detail.value)}>
              <IonSelectOption value="Female">Female</IonSelectOption>
              <IonSelectOption value="Male">Male</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton onClick={handleSave} expand="block">
            Save
          </IonButton>
        </IonList>
      {employees &&
        <IonList>
          {employees.map(e=>
            <IonItem key={e.id} lines="none">
              <IonLabel slot="start">{e.name}</IonLabel>
              <IonLabel slot="end">{e.gender}</IonLabel>
            </IonItem>
          )}
        </IonList>
      }
      </IonContent>
    </IonPage>
  );
};

export default Home;
