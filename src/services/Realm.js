import Realm from 'realm';

import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';

import { getDefaultCategories } from './Categories';
import { cleanInitialized } from './Welcome';

export const getRealm = async () => {
  const realm = await Realm.open({
    schema: [CategorySchema, EntrySchema],
    schemaVersion: 5,
  });
  initDB(realm);
  // dropDB(realm);
  // cleanInitialized();

  return realm;
};

export const initDB = realm => {
  const categoriesLength = realm.objects('Category').length;
  console.log(`initDB :: Categories length: ${categoriesLength}`);

  if (categoriesLength === 0) {
    const categories = getDefaultCategories();

    console.log("InitDB :: initing db...");

    try {
      realm.write(() => {
        categories.forEach(category => {
          console.log(
            `InitDB :: creating category ${JSON.stringify(category)}`
          );

          realm.create("Category", category, true);
        });
      })
    } catch (error) { }
  } else {
    console.log("InitDB :: Categories already existing... Skipping.")
  }
}

export const dropDB = realm => {
  console.log(`dropDB :: Dropping DB...`)
  realm.write(() => {
    realm.deleteAll();
  })
}