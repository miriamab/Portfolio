const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://zebra952020_db_user:YkcSVvUCRxmqGIXg@cluster1.tdzsohz.mongodb.net/portfoliodb?retryWrites=true&w=majority';

async function testContactSubmission() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Valide Kontaktanfrage
    console.log('\n📝 Test 1: Valide Kontaktanfrage');
    const validResponse = await fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Max Mustermann',
        email: 'max@example.com',
        message: 'Dies ist eine Testnachricht mit mindestens 10 Zeichen.'
      })
    });
    const validData = await validResponse.json();
    console.log('Status:', validResponse.status);
    console.log('Response:', validData);

    // Test 2: Ungültige E-Mail
    console.log('\n📝 Test 2: Ungültige E-Mail');
    const invalidEmailResponse = await fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Dies ist eine weitere Testnachricht.'
      })
    });
    const invalidEmailData = await invalidEmailResponse.json();
    console.log('Status:', invalidEmailResponse.status);
    console.log('Response:', invalidEmailData);

    // Test 3: Zu kurzer Name
    console.log('\n📝 Test 3: Zu kurzer Name');
    const shortNameResponse = await fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A',
        email: 'test@example.com',
        message: 'Dies ist eine Testnachricht.'
      })
    });
    const shortNameData = await shortNameResponse.json();
    console.log('Status:', shortNameResponse.status);
    console.log('Response:', shortNameData);

    // Test 4: Zu kurze Nachricht
    console.log('\n📝 Test 4: Zu kurze Nachricht');
    const shortMessageResponse = await fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Kurz'
      })
    });
    const shortMessageData = await shortMessageResponse.json();
    console.log('Status:', shortMessageResponse.status);
    console.log('Response:', shortMessageData);

    // Test 5: Fehlende Felder
    console.log('\n📝 Test 5: Fehlende Felder');
    const missingFieldsResponse = await fetch('http://localhost:3001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User'
      })
    });
    const missingFieldsData = await missingFieldsResponse.json();
    console.log('Status:', missingFieldsResponse.status);
    console.log('Response:', missingFieldsData);

    // Alle Kontakte abrufen
    console.log('\n📋 Alle gespeicherten Kontakte:');
    const allContactsResponse = await fetch('http://localhost:3001/api/contacts');
    const allContacts = await allContactsResponse.json();
    allContacts.forEach((contact, idx) => {
      console.log(`${idx + 1}. ${contact.name} (${contact.email})`);
      console.log(`   Nachricht: ${contact.message.substring(0, 50)}...`);
      console.log(`   Erstellt: ${new Date(contact.createdAt).toLocaleString('de-DE')}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Tests abgeschlossen');
  } catch (error) {
    console.error('❌ Fehler:', error);
    await mongoose.disconnect();
  }
}

testContactSubmission();
