import { IonButton, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { getAllPics, savePicture } from '../databaseHandler';

interface PictureType {
  id? : number,
  name: string,
  pictureContent: Blob
}

const CameraPage: React.FC = () => {
  const [pictureURL, setPictureURL] = useState('/assets/pictureHolder.png')
  const [pictureName, setPictureName] = useState('')
  const [allPics, setAllPics] = useState<PictureType[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function fetchDataFromDB() {
    const pics = await getAllPics()
    setAllPics(pics)
  }


  useEffect(() => {
    fetchDataFromDB();
    console.log('useEffect ran!')
  }, [])

  const savePictureHandler = async () => {
    //download file from a source(internet or local)
    const reponse = await fetch(pictureURL);
    //get the blob of the object
    const blob = await reponse.blob();
    //construct the Piture object
    let pic = {
      name: pictureName,
      pictureContent: blob
    }
    //save it to database
    savePicture(pic);
    alert('save file completed!')
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
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
          <input ref={fileInputRef} hidden type="file" onChange={handleFileChange} /> 
          <img 
              style ={{cursor: "pointer"}}
              title="Click to select a picture"
              onClick={()=>fileInputRef.current?.click()}  
              src={pictureURL} width="120" height="100" />
        </IonItem>
        <IonItem>
          <IonButton onClick={savePictureHandler}>Save Picture</IonButton>
        </IonItem>
        {allPics &&
          <IonList>
            {allPics.map(p =>
              <IonItem key={p.id}>
                {p.name}
                <IonThumbnail slot="end">
                  <IonImg src={URL.createObjectURL(p.pictureContent)}></IonImg>
                </IonThumbnail>
              </IonItem>
            )}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
