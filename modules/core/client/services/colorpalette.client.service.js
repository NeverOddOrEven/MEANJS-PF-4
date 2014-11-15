'use strict';

//Menu service used for managing  menus
angular.module('core').service('ColorPalette', [
    function() {
        
        /* Consider adding server support to configure this */
        var defaultPalette = [
            {foreground: '#69D2E7', border: '#57CDD0'},
            {foreground: '#A7DBD8', border: '#97CBD0'}, 
            {foreground: '#E0E4CC', border: '#D0D3BC'}, 
            {foreground: '#F38630', border: '#FA5900'},
            {foreground: '#6A7B79', border: '#556270'},
            {foreground: '#ACE332', border: '#8EC70D'},
            {foreground: '#FF6B6B', border: '#DD5B5B'}
        ];
        
        /* 
            Keys are the encountered characters
            Values are the position in the system color palette
        */
        var colorTransferFunction = null;
        
        /*
            If the color transfer function is null, check the server
            If the server returns null (first use), assign an empty object
            Else assign the returned object
            
            Returns a promise
        */
        function getColorTransferFunction() {
            return colorTransferFunction;
        }
        
        /* 
            Save the transfer function to the server 
        
            Returns a promise
        */
        function saveColorTransferFunction() {
        }
        
        /*
            Get the color transfer function
            Check the color transfer function for the character
            If there is not one, create an entry and assign a color
            Else return the color object at the position specified in the map
            
            Returns a promise
        */
        function getColorForCharacter(character) {
            
        }
    
        return {
            getColorForCharacter: getColorForCharacter
        };
    }
]);