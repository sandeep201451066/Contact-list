<template>
    <v-app>
        <v-content>
            <v-container>
                <v-layout align-start justify-center>
                    <v-data-table :headers="headers" :items="ContactList" hide-actions class="elevation-2">
                        <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.company }}</td>
              <td class="text-xs-right">{{ props.item.job }}</td>
              <td class="text-xs-right">{{ props.item.email }}</td>
              <td class="text-xs-right">{{ props.item.phone }}</td>
              <td class="text-xs-right">{{ props.item.notes }}</td>
              <td class="text-xs-right"><v-btn color="info" @click="UpdateContacts(props.item.id)">Update</v-btn></td>
                </template>
          </v-data-table>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">Update Contact</v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-avatar size="40px" class="mr-3">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt>
                  </v-avatar>
                  <v-text-field placeholder="Name" v-model="Contacts.name"></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="business" placeholder="Company" v-model="Contacts.company"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field placeholder="Job title" v-model="Contacts.job"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="mail" placeholder="Email" v-model="Contacts.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  type="tel"
                  prepend-icon="phone"
                  placeholder="(000) 000 - 0000"
                  mask="phone"
                  v-model="Contacts.phone"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="notes" placeholder="Notes" v-model="Contacts.notes"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn flat color="primary">More</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat @click="UpdateContactsmethod">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
    import {
        db
    } from './firebase.js'
    export default {
        props: ["ContactList"],
        data: () => ({
            dialog: false,
            Contacts: {},
            headers: [
    
                {
                    text: "Name",
                    align: "left",
                    sortable: false,
                    value: "name"
                },
                {
                    text: "Company",
                    value: "Company"
                },
                {
                    text: "Job",
                    value: "Job"
                },
                {
                    text: "Email",
                    value: "Email"
                },
                {
                    text: "Phone",
                    value: "Phone"
                },
                {
                    text: "Notes",
                    value: "Notes"
                },
                {
                    text: "Action",
                    align: "left",
                    sortable: false,
                    value: "action"
                },
            ],
        }),
        mounted() {
            let table = document.querySelector(".v-datatable tbody");
            const _self = this;
            Sortable.create(table, {
                handle: ".handle", // Use handle so user can select text
                onEnd({
                    newIndex,
                    oldIndex
                }) {
                    const rowSelected = _self.desserts.splice(oldIndex, 1)[0]; // Get the selected row and remove it
                    _self.desserts.splice(newIndex, 0, rowSelected); // Move it to the new index
                }
            });
        },
        methods: {
            // Update contact list

            UpdateContacts(id) {
                this.dialog = true
                this.Contacts = this.ContactList.find(item => item.id === id)
            },
            UpdateContactsmethod() {
                const updateRef = db.collection('Contacts').where('id', '==', this.Contacts.id)
                this.dialog = false
                updateRef.set(this.Contacts)
                this.$emit('clicked', 'someValue')
                console.log(docRef)
            }
        }
    }
</script>

