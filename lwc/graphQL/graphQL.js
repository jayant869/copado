import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

// const accountColumns = [
//     { label: 'Account ID', fieldName: 'id' },
//     { label: 'Account Name', fieldName: 'name' },
//     { label: 'Contacts Name', fieldName: 'contactName' },
//     { label: 'Opportunities Name', fieldName: 'oppName' },

// ];

// const leadColumns = [
//     { label: 'Lead ID', fieldName: 'id' },
//     { label: 'Lead Name', fieldName: 'name' },
// ];

export default class GraphQL extends LightningElement {
    // TestAccountColumns = accountColumns;
    // TestLeadColumns = leadColumns;
    
    arr = [];
    AccountResults;
    lead;
    renderData = false; // Set the initial value to false
    //Account(where: { Name: { like: "Test%" } }){
    @wire(graphql, {
        query: gql`
            query AccountWithName {
                uiapi {
                    query {
                        Account {
                            edges {
                                node {
                                    Id
                                    Name {
                                        value
                                    }
                                    Contacts {
                                        edges {
                                            node {
                                                Id
                                                Name {
                                                    value
                                                }
                                            }
                                        }
                                    }
                                    Opportunities {
                                        edges {
                                            node {
                                                Id
                                                Name {
                                                    value
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        Lead {
                            edges {
                                node {
                                    Id
                                    Name {
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
    })
    graphqlQueryResult({ error, data }) {
        if (error) {
            console.log(error); // Log the error
            this.AccountResults = []; // Set empty array for AccountResults
            this.lead = []; // Set empty array for lead
        } else if (data) {
            console.log('its running');
            this.AccountResults = data.uiapi.query.Account.edges.map((account) => {
                return {
                    id: account.node.Id,
                    name: account.node.Name.value,
                    contacts: account.node.Contacts.edges.map((contact) => {
                        return {
                            //id: contact.node.Id,
                            name: contact.node.Name.value
                        };
                    }),
                    opportunities: account.node.Opportunities.edges.map((opportunity) => {
                        return {
                            //id: opportunity.node.Id,
                            name: opportunity.node.Name.value
                        };
                    })
                };
            });
            this.lead = data.uiapi.query.Lead.edges.map((lead) => {
                return {
                    id: lead.node.Id,
                    name: lead.node.Name.value,
                };
            });
        }
        this.renderData = true;
        console.log('Account:', JSON.stringify(this.AccountResults));
        console.log('Lead:', JSON.stringify(this.lead));
    }

    get columns() {
        return [
            { label: 'Account ID', fieldName: 'id' },
            { label: 'Account Name', fieldName: 'name' },
            { label: 'Contacts Name', fieldName: 'contactName' },
            { label: 'Opportunities Name', fieldName: 'oppName' }
        ];
    }
    get columnsLead() {
        return [
            { label: 'Lead ID', fieldName: 'id' },
            { label: 'Lead Name', fieldName: 'name' },
        ];
    }
    get Accdata() {
        if (!this.AccountResults) {
          return []; // Return an empty array if AccountResults is undefined
        }
        
        return this.AccountResults.map((account) => {
          console.log('account.name---- ', account.name);
      
          // Check if account.contacts is defined and an array
          const contactNames = Array.isArray(account.contacts)
            ? account.contacts.map((contact) => {
                console.log('account.contacts---- ', contact.name);
                return contact.name;
              }).join(', ')
            : '';
          console.log('contactNames===============> ',contactNames);
          // Check if account.opportunities is defined and an array
          const oppNames = Array.isArray(account.opportunities)
            ? account.opportunities.map((opportunity) => {
                console.log('account.opportunity---- ', opportunity.name);
                return opportunity.name;
              }).join(', ')
            : '';
            console.log('oppNames================> ',oppNames);
          return {
            id: account.id,
            name: account.name,
            contactName: contactNames,
            oppName: oppNames
          };
        });
    }      
}