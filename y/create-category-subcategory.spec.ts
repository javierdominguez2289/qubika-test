import { test, expect } from '@playwright/test';

test('Qubika Technical test', async ({ page, request }) => {
  const testNumber = Math.floor(Math.random() * 9999);
  const USER = {
    email: testNumber + "javier.dominguez@gmail.com",
    userName: testNumber + "jdominguez",
}

  //API user creation
  const res = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register',{
      data:{
          "email": USER.email,
          "firstName": "javier",
          "lastName": "dominguez",
          "password": "12345678",
          "roles": [
            "ROLE_ADMIN"
          ],
          "userName": USER.userName        
      }
  });

  //verify code created 201
  expect(res.status()).toBe(201);

  //Login
  await page.goto('https://club-administration.qa.qubika.com/#/auth/login');

  // Verify Login Labels
  await expect (page.getByRole('heading', { name: 'Qubika Club' })).toBeVisible();
  await expect( page.getByText('Por favor ingrese correo y')).toBeVisible();
  await expect( page.getByText('Recordarme')).toBeVisible();

  await page.getByPlaceholder('Usuario o correo electrónico').fill(USER.email);
  await page.getByPlaceholder('Contraseña').fill('12345678');
  await page.getByRole('button', { name: 'Autenticar' }).click();

  //Verify succesfull Login
  await expect( page.getByRole('link', { name: ' Tipos de Categorias' })).toBeVisible();
  await page.getByRole('link', { name: ' Tipos de Categorias' }).click();

  //Add new category
  await page.getByRole('button', { name: ' Adicionar' }).click();
  await page.getByPlaceholder('Nombre de categoría').click();
  await page.getByPlaceholder('Nombre de categoría').fill(USER.userName + 'categoria');
  await page.getByRole('button', { name: 'Aceptar' }).click();

  //category was created successfully
  await expect(page.getByLabel('Tipo de categoría adicionada')).toBeVisible();

  //Add new sub-category
  await page.getByRole('button', { name: ' Adicionar' }).click();
  await page.locator('label').filter({ hasText: 'Es subcategoria?' }).click();
  await page.getByLabel('Adicionar tipo de categoría').locator('span').nth(1).click();
  await page.getByRole('combobox').getByRole('textbox').fill(USER.userName + 'categoria');
  await page.getByRole('option', { name: USER.userName + 'categoria' }).click();
  await page.getByPlaceholder('Nombre de categoría').click();
  await page.getByPlaceholder('Nombre de categoría').fill(USER.userName + 'subcategoria');
  await page.getByRole('button', { name: 'Aceptar' }).click();

  //sub-category was created successfully
  await expect(page.getByLabel('Tipo de categoría adicionada')).toBeVisible();

  console.log(USER.email);
});