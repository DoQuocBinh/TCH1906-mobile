import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { savePicture } from '../databaseHandler';

interface PictureType{
  name: string,
  pictureContent:Blob
}

const CameraPage: React.FC = () => {
  const [pictureURL,setPictureURL] = useState('')
  const [pictureName,setPictureName] = useState('')
  
  const savePictureHandler =async ()=>{
    const reponse = await fetch(pictureURL);
    const blob  = await reponse.blob();
    let pic = {
      name: pictureName,
      pictureContent: blob
    }
    savePicture(pic);
    alert('save file completed!')
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files !=null){
      let name = event.target.files[0].name
      let picURL = URL.createObjectURL(event.target.files[0])
      setPictureName(name)
      setPictureURL(picURL);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera functions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <input type="file" onChange={handleFileChange}/>
        </IonItem>
        <IonItem>
          <img src={pictureURL} width="120" height="100"/>
        </IonItem>
        <IonItem>
          <IonButton onClick={savePictureHandler}>Save Picture</IonButton>
        </IonItem>
        
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
