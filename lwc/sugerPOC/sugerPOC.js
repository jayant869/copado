import { LightningElement, track, api } from 'lwc';

export default class SugerPOC extends LightningElement {

    showModal = false;
    currentIndex;
    InstalledAndAssetArray = [];
    CommunityActivityType = [];
    Community = [];
    ActivityMaster = [];
    @track ArrayOfObject = [{ index: 0, SourceDimensionKey: null, DestinationDimensionKey: null, Multiplier: null }];

    handleClick() {
        this.showModal = true;
    }

    closeModal() {
        console.log('true');
        this.showModal = false;
    }

    addRow(event) {
        console.log('test');
        console.log('class ', this.template.querySelectorAll(".flexClass"));
        var copyObj = [];
        copyObj.push(...this.template.querySelectorAll(".flexClass"));
        console.log('length==> ', copyObj.length);
        var indexNumber = copyObj.length;
        console.log('indexNumber==> ', indexNumber)
        //this.currentIndex = event.currentTarget.dataset.index;
        //   console.log(this.currentIndex);
        var copyCurrentIndex = indexNumber;//Number(this.currentIndex) + 1;
        //this.SpaceNumber.push(this.ArrayOfObject[this.currentIndex].Space_Number);
        //   this.InstalledAndAssetArray.splice(copyCurrentIndex, 0, this.ArrayOfObject[this.currentIndex].Installed_Product_ID);
        //   this.CommunityActivityType.splice(copyCurrentIndex, 0, this.ArrayOfObject[this.currentIndex].Community_Activity_Type);
        //   this.Community.splice(copyCurrentIndex, 0, this.ArrayOfObject[this.currentIndex].Community)
        //   this.ActivityMaster.splice(copyCurrentIndex, 0, '');

        this.ArrayOfObject.splice(copyCurrentIndex, 0, { index: indexNumber, SourceDimensionKey: null, DestinationDimensionKey: null, Multiplier: null });
        console.log('OUTPUT : ', this.ArrayOfObject);
        if (copyCurrentIndex < indexNumber) {
            let temp = this.ArrayOfObject[indexNumber];
            this.ArrayOfObject.splice(indexNumber, 1);
            this.ArrayOfObject.splice(copyCurrentIndex, 0, temp);
        }
        for (var resetIndex = 0; resetIndex <= indexNumber; resetIndex++) {
            this.ArrayOfObject[resetIndex].index = resetIndex;
        }
    }

    renderedCallback() {
        if (this.showModal) {
            this.template.querySelector('.configDiv').scrollTop = this.template.querySelector('.configDiv').scrollHeight;
        }
    }

    removeRow(event) {
        var copy = [];
        var index = event.currentTarget.dataset.index;
        var indexNumber = JSON.parse(JSON.stringify(this.ArrayOfObject.length));

        console.log('In Remove ', event.currentTarget.dataset.index);
        console.log('Value of Indes : ', JSON.parse(JSON.stringify(this.ArrayOfObject[index])));
        copy = [...this.ArrayOfObject];
        console.log('length 1 : ', JSON.parse(JSON.stringify(this.ArrayOfObject.length)), 'Test ', copy.length);
        console.log('Copy 1 : ', JSON.parse(JSON.stringify(copy[index])), ' ## ', JSON.parse(JSON.stringify(copy)));
        copy.splice(index, 1);
        console.log("copy => " , copy);
        console.log('Copy 2 : ', JSON.parse(JSON.stringify(copy[index])), ' ## ', JSON.parse(JSON.stringify(copy)));
        console.log('length 2 : ', JSON.parse(JSON.stringify(this.ArrayOfObject)), 'Test 2 ', copy.length);
        // this.ArrayOfObject = JSON.parse(JSON.stringify(copy));
        this.ArrayOfObject = copy;


        //this.ArrayOfObject.splice(index,1);
        for (var resetIndex = 0; resetIndex <= indexNumber; resetIndex++) 
        {
            JSON.parse(JSON.stringify(copy[resetIndex].index = resetIndex))
            // copy[resetIndex].index = resetIndex;
            console.log('Copy @@ ',JSON.parse(JSON.stringify(copy[resetIndex])));
        }
    }

}