/**
 * Author: Miriam Abbas
 * Test-Script für JWT-Authentifizierung
 */

const baseUrl = 'http://localhost:3001/api';

// Test-User-Daten
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'testpassword123'
};

let authToken = '';

async function testAuth() {
  console.log('🔐 JWT Authentifizierungs-Tests\n');
  console.log('='.repeat(50));

  // Test 1: Sign Up
  console.log('\n📝 Test 1: Sign Up (Registrierung)');
  try {
    const signupRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const signupData = await signupRes.json();
    
    if (signupRes.ok) {
      console.log('✅ Registrierung erfolgreich');
      console.log('   Token erhalten:', signupData.token ? 'Ja' : 'Nein');
      console.log('   User:', signupData.user.name, `(${signupData.user.email})`);
      authToken = signupData.token;
    } else {
      console.log('⚠️  Registrierung fehlgeschlagen:', signupData.error);
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 2: Duplicate Sign Up
  console.log('\n📝 Test 2: Duplicate Sign Up (sollte fehlschlagen)');
  try {
    const duplicateRes = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });
    const duplicateData = await duplicateRes.json();
    
    if (duplicateRes.status === 409) {
      console.log('✅ Korrekt abgelehnt:', duplicateData.error);
    } else {
      console.log('❌ Fehler: Duplicate sollte abgelehnt werden');
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 3: Sign In mit falschen Credentials
  console.log('\n📝 Test 3: Sign In mit falschem Passwort');
  try {
    const wrongPasswordRes = await fetch(`${baseUrl}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: 'wrongpassword'
      })
    });
    const wrongPasswordData = await wrongPasswordRes.json();
    
    if (wrongPasswordRes.status === 401) {
      console.log('✅ Korrekt abgelehnt:', wrongPasswordData.error);
    } else {
      console.log('❌ Fehler: Falsches Passwort sollte abgelehnt werden');
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 4: Sign In mit korrekten Credentials
  console.log('\n📝 Test 4: Sign In mit korrekten Credentials');
  try {
    const signinRes = await fetch(`${baseUrl}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });
    const signinData = await signinRes.json();
    
    if (signinRes.ok) {
      console.log('✅ Anmeldung erfolgreich');
      console.log('   Token erhalten:', signinData.token ? 'Ja' : 'Nein');
      authToken = signinData.token;
    } else {
      console.log('❌ Anmeldung fehlgeschlagen:', signinData.error);
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 5: Verify Token
  console.log('\n📝 Test 5: Token Verifizierung');
  try {
    const verifyRes = await fetch(`${baseUrl}/auth/verify`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      }
    });
    const verifyData = await verifyRes.json();
    
    if (verifyRes.ok) {
      console.log('✅ Token gültig');
      console.log('   User:', verifyData.user.name);
    } else {
      console.log('❌ Token ungültig:', verifyData.error);
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 6: Zugriff auf geschützte Route ohne Token
  console.log('\n📝 Test 6: Geschützte Route ohne Token');
  try {
    const noTokenRes = await fetch(`${baseUrl}/contact`, {
      method: 'GET'
    });
    const noTokenData = await noTokenRes.json();
    
    if (noTokenRes.status === 401) {
      console.log('✅ Korrekt abgelehnt:', noTokenData.error);
    } else {
      console.log('❌ Fehler: Sollte Authentifizierung erfordern');
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 7: Zugriff auf geschützte Route mit Token
  console.log('\n📝 Test 7: Geschützte Route mit Token');
  try {
    const withTokenRes = await fetch(`${baseUrl}/contact`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (withTokenRes.ok) {
      console.log('✅ Zugriff gewährt mit gültigem Token');
    } else {
      const withTokenData = await withTokenRes.json();
      console.log('❌ Zugriff verweigert:', withTokenData.error);
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  // Test 8: Zugriff mit ungültigem Token
  console.log('\n📝 Test 8: Geschützte Route mit ungültigem Token');
  try {
    const invalidTokenRes = await fetch(`${baseUrl}/contact`, {
      method: 'GET',
      headers: { 
        'Authorization': 'Bearer invalid-token-12345'
      }
    });
    const invalidTokenData = await invalidTokenRes.json();
    
    if (invalidTokenRes.status === 401) {
      console.log('✅ Korrekt abgelehnt:', invalidTokenData.error);
    } else {
      console.log('❌ Fehler: Ungültiges Token sollte abgelehnt werden');
    }
  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n✅ Alle Tests abgeschlossen!\n');
  console.log('💡 Ihr Auth-Token:');
  console.log(authToken);
  console.log('\n📋 Verwenden Sie diesen Token für weitere API-Aufrufe:');
  console.log(`Authorization: Bearer ${authToken}`);
}

testAuth().catch(console.error);
