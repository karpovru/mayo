async function loadClients() {

  try {

    const response = await fetch("/api/clients");

    const clients = await response.json();

    const table = document.getElementById("clientsTable");

    table.innerHTML = "";

    clients.forEach(client => {

      table.innerHTML += `

        <tr class="border-t">

          <td class="p-4 font-medium">
            ${client.name}
          </td>

          <td class="p-4">
            ${client.phone}
          </td>

          <td class="p-4 text-2xl">
            ${client.offer ? "✅" : "❌"}
          </td>

          <td class="p-4 text-2xl">
            ${client.contract ? "✅" : "❌"}
          </td>

        </tr>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

loadClients();
