public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Industry, Phone, Website FROM Account];
    }

    @AuraEnabled
    public static void updateAccounts(List<Account> updatedAccounts) {
        update updatedAccounts;
    }
}