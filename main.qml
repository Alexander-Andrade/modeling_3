import QtQuick 2.4
import QtQuick.Controls 1.3
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2

import "queuingSystem.js" as Qs

ApplicationWindow {
    title: qsTr("Quening system")
    width: 640
    height: 480
    visible: true

    MainForm {
        anchors.fill: parent

        buttonGo.onClicked:{
            Qs.emulation(chanel1Text,chanel2Text,clockText,
                         queueLength,lockProbability);
        }

    MessageDialog {
        id: messageDialog
        title: qsTr("May I have your attention, please?")

        function show(caption) {
            messageDialog.text = caption;
            messageDialog.open();
        }
    }
}
}
